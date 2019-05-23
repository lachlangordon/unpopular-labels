/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const crypto = require('crypto')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const { GQLClientWrapper, GQLServerWrapper } = require(`./src/lib/graphQL`)
const { GatsbyNodeQuery, GatsbyAllNarrativeQuery } = require('./src/queries/ServerQuery')
const { createNarratives } = require('./src/lib/pageCreator')
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

  const { masterNarrative, childNarratives} = await GQLClientWrapper( query )

  // if there is no master narrative don't create nodes
  if ( masterNarrative.length ) { return }

  // create master narrative node
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
}

// take the pages from src/pages and re-generate pages for all
// exports.onCreatePage = ({ page, actions }) => {
//   console.log('in onCreatePage')
//   const { createPage, deletePage } = actions
//
//   // Remove the leading AND traling slash from path, e.g. --> blog
//   const name = page.path && setPageName(page.path)
//
//   // only create a single 404 page and don't delete index page
//   if ( page.path.includes('404') || name === 'index' ) { return }
//   console.log(name)
//
//   // first delete pages to re-create them
//   deletePage(page)
//
//   return createPage({
//      ...page,
//      context: {
//        name,
//        masterNarrativeId: __MASTER_NARRATIVE,
//      }
//   })
// }

exports.createPages = async ({ actions, graphql }) => {
  console.log('in createPages')
  const { createPage } = actions

  const narrativeTemplate = require.resolve('./src/templates/narrative.js')
  const result = await GQLServerWrapper(
    graphql(`
      ${ GatsbyAllNarrativeQuery }
    `)
  )
  const { allNarrative } = result.data
  console.log( allNarrative )

  // create pages with templates and helper functions
  createNarratives( allNarrative.edges, createPage, narrativeTemplate )
}
