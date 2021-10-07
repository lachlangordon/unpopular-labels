/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// gatsby-node.js
const { GQLGatsbyWrapper, GQLClientWrapper, printGraphQLError } = require(`./src/lib/graphQL`);
const { GatsbyNodeQuery, GatsbyAllSetQuery, GatsbyAllSetObjectQuery } = require('./bootstrap/queries');

const { getIds, processSet } = require('./bootstrap/normalise');
const { GatsbyResolvers } = require('./bootstrap/resolvers');

const { createDynamicPages, createPaginatedPages, createPaginatedSetPages } = require('./src/lib/pageCreator');
const { replaceSlash, replaceBothSlash, setPageName } = require(`./src/lib/utils`);

// later move it to config
const __MASTER_NARRATIVE = 6761;

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, store, cache }) => {

  const helpers = Object.assign({}, actions, {
    createContentDigest,
    createNodeId,
  })

  // init query to populate nodes
  const query = `
    ${GatsbyNodeQuery}
  `;

  try {

    const graphQLResults = await GQLClientWrapper( query );

    const { masterSet, childSets } = graphQLResults;

    const _master = await processSet({
      ...masterSet,
      children: childSets ? getIds(childSets) : [],
      parent: null
    }, helpers);

    // console.log( _master );

    const _childs = await Promise.all(
      childSets.map(chSet => processSet({
          ...chSet,
          parent: __MASTER_NARRATIVE
        }, helpers))
    );

    // console.log( _childs );

  } catch (e) {

    // If not a GraphQL request error, let Gatsby print the error.
    if ( !e.hasOwnProperty(`request`) ) throw e;

    printGraphQLError(e);
  }

}

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  store,
  cache,
}) => {
  // console.log(node)
  const { createNodeField, createNode } = actions;

  if (node.internal.type === 'SetImage') {
    try {
      if (node.id && node.url) {
        const fileNode = await createRemoteFileNode({
          url: node.url,
          store,
          cache,
          createNode,
          createNodeId,
        });

        if (fileNode) {
          createNodeField({
            node,
            name: 'localFile___NODE',
            value: fileNode.id,
          });
        }
      }
    } catch (err) {
      console.log(`error SetImage node link: %s`, err);
    }
  }
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  createResolvers(GatsbyResolvers);
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // setTemplate
  const setTemplate = require.resolve('./src/templates/SetPage.js');

  // objectTemplate
  const objectTemplate = require.resolve('./src/templates/ObjectPage.js');

  const sets = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllSetQuery }
    `)
  );

  const { allSet } = sets.data;

  const objects = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllSetObjectQuery }
    `)
  );
  const { allSetObject } = objects.data;

  createDynamicPages('set', allSet.edges, createPage, setTemplate );
  createDynamicPages('object', allSetObject.edges, createPage, objectTemplate );
}
