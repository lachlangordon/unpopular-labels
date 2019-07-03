/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fs = require(`fs`)
const path = require(`path`)
const crypto = require('crypto')

// gatsby-node.js
const { GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require(`graphql`)
const { createNarratives } = require('./src/lib/pageCreator')
const { GatsbyNodeQuery, GatsbyAllNarrativeQuery } = require('./src/queries/ServerQuery')
const { GQLGatsbyWrapper, GQLClientWrapper, printGraphQLError } = require(`./src/lib/graphQL`)
const { replaceSlash, replaceBothSlash, setPageName } = require(`./src/lib/utils`)

// later move it to config
const __MASTER_NARRATIVE = 6761

const getIds = ( _objects ) => {
  if ( Array.isArray(_objects) ) {
    return _objects.map(obj => `${obj._id}`)
  } else {
    let objArray = []
    Object.entries(_objects).map( ([ key, value ])  => {
      if ( key === '_id' ) {  objArray[objArray.length] = `${value}` }
    })
    return objArray
  }
}

// top level phase
const setNodeNarrative = ( _narrative ) => {
  // don't process if it does not have id
  if ( !_narrative._id ) { return }

  return {
    id: `${ _narrative._id }`,
    parent: `${ _narrative.parent || null }`,
    children: _narrative.children || [],
    internal: {
      type: `Narrative`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(_narrative))
        .digest(`hex`),
    },
    name: _narrative.title || '',
    summary: _narrative.summary || '',
    description: _narrative.description || '',
    lastUpdated: _narrative.lastUpdated || '',
    subjects: _narrative.subjects || [],
    keywords: _narrative.keywords || [],
    location: _narrative.location || [],
    associations: _narrative.associations || [],
    // narrative objects: an array of objects in narrative
    narrativeObjects: _narrative.narrativeObjects ? getIds(_narrative.narrativeObjects) : [],
    relatedNarratives: _narrative.relatedNarratives || [],
    images: _narrative.images || [],
    tileImages: _narrative.tileImages || [],
    mainImage: _narrative.mainImage || null,
  }
}

// collections in phase
const setNodeNarrativeObject = ( _narrative_obj ) => {
  // don't process if it does not have id
  if ( !_narrative_obj._id ) { return }

  return {
    id: `${ _narrative_obj._id }`,
    parent: `${ _narrative_obj.parent || null }`,
    internal: {
      type: `NarrativeObject`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(_narrative_obj))
        .digest(`hex`),
    },
    notes2: _narrative_obj.notes2,
    notes3: _narrative_obj.notes3,
    // object: this is an object instead of Array
    object : _narrative_obj.object ? setObject(_narrative_obj.object) : null,
  }
}

// object itself
const setObject = ( _object ) => {
  return {
    name: _object.title || '',
    summary: _object.summary || '',
    productionNotes: _object.productionNotes || '',
    // images: an array of images
    images: _object.images ? getIds(_object.images) : [],
  }
}

// to do: preprocess images
const setNodeImage = ( _img ) => {
  // don't process if it does not have url/id
  if ( !_img.url || !_img._id ) { return }

  return {
    id: `${ _img._id }`,
    parent: `${ _img.parent || null }`,
    internal: {
      type: `Image`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(_img))
        .digest(`hex`),
    },
    url: _img.url,
    width: _img.width || 300,   // set min width
    height: _img.height,
    caption: _img.caption || '',
  }
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode, createTypes, createParentChildLink } = actions

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

  // create resolvers
  createResolvers({
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
        type: `Narrative`,
        resolve(source, args, context, info) {
          return context.nodeModel.getNodeById({
              id: `${ __MASTER_NARRATIVE }`,
              type: `Narrative`,
            })
        }
      },
      SetsByMasterId: {
        type: [`Narrative`],
        resolve(source, args, context, info) {
          // console.log('inside create resolvers')
          // console.log(args)
          return context.nodeModel.runQuery({
            query: {
              filter: { parent: { id: { eq:  `${ __MASTER_NARRATIVE }` } } },
              sort: { fields: ['id'], order: ['ASC'] }
            },
            type: `Narrative`,
            firstOnly: false,
          })
        }
      },
      SetObjectsByParentId: {
        type: [`NarrativeObject`],
        args: {
          parentId: {
            name: `parentId`,
            type: GraphQLString,
          },
        },
        resolve(source, args, context, info) {
          // console.log(args)
          const setObjects = context.nodeModel.getAllNodes({
              type: `NarrativeObject`,
            })

          return setObjects.filter(setObj => setObj.parent == `${ args.parentId }`)
        }
      },
      ImagesByParentId: {
        type: [`Image`],
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
              type: `Image`,
            })

          return images.filter(img => img.parent == `${ args.parentId }`)
        }
      },
      ImagesByIds: {
        type: [`Image`],
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
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const narrativeTemplate = require.resolve('./src/templates/narrative.js')
  const result = await GQLGatsbyWrapper(
    graphql(`
      ${ GatsbyAllNarrativeQuery }
    `)
  )
  const { allNarrative } = result.data

  // create pages with templates and helper functions
  createNarratives( allNarrative.edges, createPage, narrativeTemplate )
}
