/**
 * Gatsby's resolver for imported nodes
 *
 */
const { GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require(`graphql`);
const { paginate } = require('gatsby/dist/schema/resolvers');

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
      args: {
        skip: {
          name: `skip`,
          type: GraphQLInt,
        },
        limit: {
          name: `limit`,
          type: GraphQLInt
        },
      },
      resolve(source, args, context, info) {
        const sets = context.nodeModel.runQuery({
          query: {
            filter: { parent: { id: { eq:  `${ __MASTER_NARRATIVE }` } } },
            sort: { fields: ['id'], order: ['ASC'] }
          },
          type: `Set`,
          firstOnly: false,
        });

        return sets.then((sets) => {
          if (args.skip) {
            sets = sets.slice(args.skip);
          }

          if (args.limit) {
            sets = sets.slice(0, args.limit);
          }
          return sets;
        });


      }
    },
    SetObjectsByParentId: {
      type: [`SetObject`],
      args: {
        parentId: {
          name: `parentId`,
          type: GraphQLString,
        },
        skip: {
          name: `skip`,
          type: GraphQLInt,
        },
        limit: {
          name: `limit`,
          type: GraphQLInt
        },
      },
      resolve(source, args, context, info) {
        // console.log(args)
        const setObjects = context.nodeModel.getAllNodes({
            type: `SetObject`,
          });

        let filteredObjects = setObjects.filter(setObj => setObj.parent == `${ args.parentId }`);

        if (args.skip) {
          filteredObjects = filteredObjects.slice(args.skip);
        }

        if (args.limit) {
          filteredObjects = filteredObjects.slice(0, args.limit);
        }
        return filteredObjects;
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
