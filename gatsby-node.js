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

const { getThumborImageUrl } = require('maas-js-utils');

// later move it to config
const __MASTER_NARRATIVE = 6761;

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const { createNode, createParentChildLink } = actions;

  // init query to populate nodes
  const query = `
    ${GatsbyNodeQuery}
  `;

  try {

    const { masterSet, childSets } = await GQLClientWrapper( query );

    // if there is no master narrative don't create nodes
    if ( masterSet.length ) { return; }

    // create nodes
    return new Promise((resolve, reject) => {

      const _master = processSet({
        ...masterSet,
        children: childSets ? getIds(childSets) : [],
        parent: null
      }, createNode);

      childSets.forEach(chSet => {
          const _node = processSet({
            ...chSet,
            parent: __MASTER_NARRATIVE
          }, createNode);
      });

      resolve();
    })


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

        let fileNode = await createRemoteFileNode({
          url: getThumborImageUrl(node.id, { width: 1000, height: 0, smart: true }),
          store,
          cache,
          createNode,
          createNodeId,
        });

        if (fileNode) {
          createNodeField({
            node,
            name: 'localMainFile___NODE',
            value: fileNode.id,
          });
        }
        fileNode = await createRemoteFileNode({
          url: getThumborImageUrl(node.id, { width: 420, height: 0, smart: true }),
          store,
          cache,
          createNode,
          createNodeId,
        });

        if (fileNode) {
          createNodeField({
            node,
            name: 'localTileFile___NODE',
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
