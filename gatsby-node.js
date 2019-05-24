/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const crypto = require('crypto')

const { createNarratives } = require('./src/lib/pageCreator')
const { GatsbyNodeQuery, GatsbyAllNarrativeQuery } = require('./src/queries/ServerQuery')
const { GQLClientWrapper, GQLServerWrapper, printGraphQLError } = require(`./src/lib/graphQL`)
const { replaceSlash, replaceBothSlash, setPageName } = require(`./src/utils`)

// later move it to config
const __MASTER_NARRATIVE = 6761

const setNodeNarrative = ( _narrative ) => {
  return {
    id: `${ _narrative._id }`,
    parent: `${ __MASTER_NARRATIVE }`,
    children: [],
    internal: {
      type: `Narrative`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(_narrative))
        .digest(`hex`),
    },
    name: _narrative.title,
    summary: _narrative.summary,
    description: _narrative.description,
    subject: _narrative.subject,
    lastUpdated: _narrative.lastUpdated,
  }
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  // init query to populate nodes
  const query = `
    ${GatsbyNodeQuery}
  `

  try {
    console.log(`starting to fetch data from MAAS_API`)

    const { masterNarrative, childNarratives} = await GQLClientWrapper( query )

    // if there is no master narrative don't create nodes
    if ( masterNarrative.length ) { return }

    // create nodes
    return new Promise((resolve, reject) => {
      // create master narrative
      const _master =  {
        ...setNodeNarrative(masterNarrative),
        parent: `null`,
      }
      createNode(_master)

      // create child narrative nodes
      childNarratives.forEach(data => {
        const _node = setNodeNarrative(data)
        createNode(_node)
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

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const narrativeTemplate = require.resolve('./src/templates/narrative.js')
  const result = await GQLServerWrapper(
    graphql(`
      ${ GatsbyAllNarrativeQuery }
    `)
  )
  const { allNarrative } = result.data

  // create pages with templates and helper functions
  createNarratives( allNarrative.edges, createPage, narrativeTemplate )
}
