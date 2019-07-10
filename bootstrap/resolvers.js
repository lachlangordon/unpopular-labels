/**
 * Gatsby's resolver for imported nodes
 *
 */
const { GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require(`graphql`)

 // later move it to config
const __MASTER_NARRATIVE = 6761

const GatsbyResolvers = {
  // Create a new root query field.
  // Field resolvers can use all of Gatsby's querying capabilities
  Query: {
    getMasterSetId: {
      type: `String`,
      resolve(source, args, context, info) {
        return `${ __MASTER_NARRATIVE }`
      }
    },
    getMasterSet: {
      type: `Set`,
      resolve(source, args, context, info) {
        return context.nodeModel.getNodeById({
            id: `${ __MASTER_NARRATIVE }`,
            type: `Set`,
          })
      }
    },
    SetsByMasterId: {
      type: [`Set`],
      resolve(source, args, context, info) {
        // console.log('inside create resolvers')
        // console.log(args)
        return context.nodeModel.runQuery({
          query: {
            filter: { parent: { id: { eq:  `${ __MASTER_NARRATIVE }` } } },
            sort: { fields: ['id'], order: ['ASC'] }
          },
          type: `Set`,
          firstOnly: false,
        })
      }
    },
    SetObjectsByParentId: {
      type: [`SetObject`],
      args: {
        parentId: {
          name: `parentId`,
          type: GraphQLString,
        },
      },
      resolve(source, args, context, info) {
        // console.log(args)
        const setObjects = context.nodeModel.getAllNodes({
            type: `SetObject`,
          })

        return setObjects.filter(setObj => setObj.parent == `${ args.parentId }`)
      }
    },
    ImagesByParentId: {
      type: [`SetImage`],
      args: {
        parentId: {
          name: `parentId`,
          type: GraphQLString,
        },
      },
      resolve (source, args, context, info) {
        // console.log("context - path")
        // console.log(context.path)
        const images = context.nodeModel.getAllNodes({
            type: `SetImage`,
          })

        return images.filter(img => img.parent == `${ args.parentId }`)
      }
    },
    ImagesByIds: {
      type: [`SetImage`],
      args: {
        ids: {
          name: `ids`,
          type: [GraphQLString],
        }
      },
      resolve (source, args, context, info) {

        return context.nodeModel.getNodesByIds({
          ids: args.ids
        })
      }
    }
  }
}

module.exports = {
  GatsbyResolvers,
}
// export default GatsbyResolvers
