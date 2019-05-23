/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const { GatsbyQuery } = require('./src/queries/ServerQuery')
const { createNarratives } = require('./src/lib/pageCreator')
const { replaceSlash, replaceBothSlash, setPageName, GQLwrapper } = require(`./src/utils`)

// later move it to config
const __MASTER_NARRATIVE = 6761

// insert additional vars into nodes for queries
// exports.onCreateNode = ({ node, actions }) => {
  // console.log('in onCreateNode')

  // const { createNodeField } = actions
  // const { type } = node.internal
  // console.log(type)

  // if ( type === 'SitePage' ) {
  //   const slug = replaceSlash(node.path)
  //   console.log(slug)
  //   createNodeField({ node, name: 'slug', value: `${slug}` })
  // }
  // switch( type ) {
  //   case 'SitePage':
  //     // if ( typeof(node.path) !== 'undefined' ) {
  //       // const slug = buildPath(node.path)
  //       console.log(type)
  //
  //       // createNodeField({ node, name: 'slug', value: slug })
  //     // }
  //     return
  //   default:
  //     return
  // }

}

// take the pages from src/pages and re-generate pages for all
exports.onCreatePage = ({ page, actions }) => {
  console.log('in onCreatePage')
  const { createPage, deletePage } = actions

  // Remove the leading AND traling slash from path, e.g. --> blog
  const name = page.path && setPageName(page.path)
  // test narrative
  // const narrativeId = 6762

  // only create a single 404 page and don't delete index page
  if ( page.path.includes('404') || name === 'index' ) { return }
  console.log(name)

  // first delete pages to re-create them
  deletePage(page)

  return createPage({
     ...page,
     context: {
       name,
       // narrativeId,
       masterNarrativeId: __MASTER_NARRATIVE,
     }
  })
}


exports.createPages = async ({ actions, graphql }) => {
  console.log('in createPages')
  const { createPage } = actions

  const narrativeTemplate = require.resolve('./src/templates/narrative.js')
  const result = await GQLwrapper(
    graphql(`
      {
        ${GatsbyQuery}
      }
    `)
  )
  console.log( result.data.maas )
  //
  // // create pages with templates and helper functions
  createNarratives(result.data.maas.childNarratives, createPage, narrativeTemplate)
}
