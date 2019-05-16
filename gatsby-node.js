/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 const path = require(`path`)
 // const remark = require(`remark`)
 // const html = require(`remark-html`)
 const dateformat = require(`dateformat`)
 const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
 const { makeBlogPath } = require(`./src/utils`)

 exports.createPages = async ({ actions, graphql }) => {
   const { data } = await graphql(`
     query {
       maas {
         narrativeById (_id: 6761) {
           _id
           title
           summary
           description
           narrativeObjects {
             _id
             notes2
             notes3
             object {
               _id
               parentId
               title
               summary
               productionNotes
             }
           }
         }
       }
     }
   `)

   console.log(data);
   // data.maas.narratives.forEach(gallery => {
   // //   actions.createPage({
   // //     path: makeBlogPath(blog),
   // //     component: path.resolve(`./src/components/blog-post.js`),
   // //     context: {
   // //       blogId: blog.id,
   // //     },
   // //   })
   // })
 }


 exports.createResolvers = ({
   actions,
   cache,
   createNodeId,
   createResolvers,
   store,
 }) => {
   const { createNode } = actions
   createResolvers({

     // GraphCMS_BlogPost: {
     //   createdAt: {
     //     type: `String`,
     //     resolve(source, args, context, info) {
     //       return dateformat(source.date, `fullDate`)
     //     },
     //   },
     //   post: {
     //     resolve(source, args, context, info) {
     //       return remark()
     //         .use(html)
     //         .processSync(source.post).contents
     //     },
     //   },
     // },

     // GraphCMS_Asset: {
     //   imageFile: {
     //     type: `File`,
     //     projection: { url: true },
     //     resolve(source, args, context, info) {
     //       return createRemoteFileNode({
     //         url: source.url,
     //         store,
     //         cache,
     //         createNode,
     //         createNodeId,
     //       })
     //     },
     //   },
     // },
   })
 }
