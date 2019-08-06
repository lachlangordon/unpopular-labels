/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// gatsby-node.js
const { GQLGatsbyWrapper, GQLClientWrapper, printGraphQLError } = require(`./src/lib/graphQL`)
const { GatsbyNodeQuery, GatsbyAllSetQuery, GatsbyAllSetObjectQuery } = require('./bootstrap/queries')

const { getIds, setNodeSet, setNodeSetObject, setNodeImage } = require('./bootstrap/normalise')
const { GatsbyResolvers } = require('./bootstrap/resolvers')

const { createDynamicPages, createPaginatedPages, createPaginatedSetPages } = require('./src/lib/pageCreator')
const { replaceSlash, replaceBothSlash, setPageName } = require(`./src/lib/utils`)

// later move it to config
const __MASTER_NARRATIVE = 6761

exports.sourceNodes = async ({ actions }) => {
  const { createNode, createParentChildLink } = actions

  // init query to populate nodes
  const query = `
    ${GatsbyNodeQuery}
  `

  try {
    console.log(`starting to fetch data from MAAS_API`)

    const { masterSet, childSets } = await GQLClientWrapper( query )

    // if there is no master narrative don't create nodes
    if ( masterSet.length ) { return }

    // create nodes
    return new Promise((resolve, reject) => {

      // create master narrative
      const _master = setNodeSet({
        ...masterSet,
        children: childSets ? getIds(childSets) : [],
        parent: null
      })
      createNode(_master)

      // create child narrative nodes
      childSets.forEach(cn => {
        const _node = setNodeSet({
          ...cn,
          parent: __MASTER_NARRATIVE
        })
        createNode(_node)
        // createParentChildLink({ parent: _master, child: _node })

        // check for linked narrative objects
        if ( cn.narrativeObjects.length ) {

          cn.narrativeObjects.forEach(sobj => {
            const _sobj = setNodeSetObject({ ...sobj, parent: _node.id })

            // narrative object id as parent id
            const parentObjId = _sobj.id

            // check for linked objects :
            // object id - same as narrative object id
            if ( sobj.object ) {
              console.log(`testing sobj-id: %s vs. parent: %s`, sobj.object._id, _sobj.id)
              // check for images
              if ( sobj.object.images.length ) {
                const { images } = sobj.object
                images.forEach(img => {
                  const _img = setNodeImage({ ...img, parent: parentObjId })
                  createNode(_img)
                })
              }
            }

            // create narrative object node
            createNode(_sobj)
          })
        }
      })

      console.log(`finished fetching data`)
      resolve()
    })


  } catch (e) {

    // If not a GraphQL request error, let Gatsby print the error.
    if ( !e.hasOwnProperty(`request`) ) throw e

    printGraphQLError(e)
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
  const { createNodeField, createNode } = actions

  if (node.internal.type === 'SetImage') {
    console.log(`process image: `, node.url)
    try {
      const fileNode = await createRemoteFileNode({
        url: node.url,
        store,
        cache,
        createNode,
        createNodeId,
      })
      console.log(`NodeId: %s`, fileNode.id)
      if (fileNode) {
        createNodeField({
          node,
          name: 'localFile___NODE',
          value: fileNode.id,
        })
      }
    } catch (err) {
      console.log(`error SetImage node link: %s`, err)
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

  createResolvers(GatsbyResolvers)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const setTemplate = require.resolve('./src/templates/SetPage.js');
  const objectTemplate = require.resolve('./src/templates/ObjectPage.js');
  const allTemplate = require.resolve('./src/templates/AllPage.js');

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

  // // create pages with templates and helper functions
  createPaginatedSetPages('set', allSet.edges, createPage, setTemplate, 3, 'setObjects' );
  createPaginatedPages('all', allSet.edges, createPage, allTemplate, 2);
  createDynamicPages('object', allSetObject.edges, createPage, objectTemplate );
};
