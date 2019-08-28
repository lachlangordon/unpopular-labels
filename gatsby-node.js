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

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const { createNode, createParentChildLink } = actions;

  // init query to populate nodes
  const query = `
    ${GatsbyNodeQuery}
  `;

  try {
    console.log(`starting to fetch data from MAAS_API`);

    const { masterSet, childSets } = await GQLClientWrapper( query );

    console.log(`finished fetching data`);

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

      console.log(`finished importing data`);
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
    console.log(`process image: `, node.url);
    try {
      const fileNode = await createRemoteFileNode({
        url: node.url,
        store,
        cache,
        createNode,
        createNodeId,
      });
      console.log(`NodeId: %s`, fileNode.id);
      if (fileNode) {
        createNodeField({
          node,
          name: 'localFile___NODE',
          value: fileNode.id,
        });
      }
    } catch (err) {
      console.log(`error SetImage node link: %s`, err);
    }
  }
}

// re-create index page with injected masterNarrativeId is no longer necessary
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Remove the leading AND traling slash from path, e.g. --> blog
  // pages = local pages injected with pageContext
  const name = page.path && setPageName( page.path );
  // const pages = [ 'index', 'images' ]
  const pages = [ 'images' ];

  // check entry in pages array
  if ( pages.includes(name) ) {
    // First delete the page so it can be re-created
    deletePage(page);

    // return createPage({
    //   ...page,
    //   context: {
    //     masterNarrativeId: `${ __MASTER_NARRATIVE }`,
    //   }
    // })
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

  const setTemplate = require.resolve('./src/templates/SetPage.js');
  const allTemplate = require.resolve('./src/templates/AllPage.js');
  const objectTemplate = require.resolve('./src/templates/ObjectPage.js');

  const sets = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllSetQuery }
    `)
  );

  const { allSet } = sets.data;
  console.log(allSet.edges);

  const objects = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllSetObjectQuery }
    `)
  );
  const { allSetObject } = objects.data;

  // create pages with templates and helper functions
  createPaginatedSetPages('set', allSet.edges, createPage, setTemplate, 3, 'setObjects' );
  createPaginatedPages('all', allSet.edges, createPage, allTemplate, 2);
  createDynamicPages('object', allSetObject.edges, createPage, objectTemplate );
}
