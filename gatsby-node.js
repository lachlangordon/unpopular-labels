/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// gatsby-node.js
const { GQLGatsbyWrapper, GQLClientWrapper, printGraphQLError } = require(`./src/lib/graphQL`)
const { GatsbyNodeQuery, GatsbyAllSetQuery } = require('./bootstrap/queries')

const { getIds, setNodeNarrative, setNodeNarrativeObject, setNodeImage } = require('./bootstrap/normalise')
const { GatsbyResolvers } = require('./bootstrap/resolvers')

const { createNarratives } = require('./src/lib/pageCreator')
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

    const { masterNarrative, childNarratives } = await GQLClientWrapper( query )

    // if there is no master narrative don't create nodes
    if ( masterNarrative.length ) { return }

    // create nodes
    return new Promise((resolve, reject) => {

      // create master narrative
      const _master = setNodeNarrative({
        ...masterNarrative,
        children: childNarratives ? getIds(childNarratives) : [],
        parent: null
      })
      createNode(_master)

      // create child narrative nodes
      childNarratives.forEach(cn => {
        const _node = setNodeNarrative({
          ...cn,
          parent: __MASTER_NARRATIVE
        })
        createNode(_node)
        // createParentChildLink({ parent: _master, child: _node })

        // check for linked narrative objects
        if ( cn.narrativeObjects.length ) {

          cn.narrativeObjects.forEach(nobj => {
            const _nobj = setNodeNarrativeObject({ ...nobj, parent: _node.id })

            // narrative object id as parent id
            const parentObjId = _nobj.id

            // check for linked objects :
            // object id - same as narrative object id
            if ( nobj.object ) {
              console.log(`testing nobj-id: %s vs. parent: %s`, nobj.object._id, _nobj.id)
              // check for images
              if ( nobj.object.images.length ) {
                const { images } = nobj.object
                images.forEach(img => {
                  const _img = setNodeImage({ ...img, parent: parentObjId })
                  createNode(_img)
                })
              }
            }

            // create narrative object node
            createNode(_nobj)
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
  const { createPage } = actions

  const narrativeTemplate = require.resolve('./src/templates/narrative.js')
  const result = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllSetQuery }
    `)
  )
  const { allNarrative } = result.data

  // create pages with templates and helper functions
  createNarratives( allNarrative.edges, createPage, narrativeTemplate )
}
