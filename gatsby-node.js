/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const crypto = require('crypto')

// gatsby-node.js
const { GraphQLSchema, GraphQLString } = require(`graphql`)
const { createNarratives } = require('./src/lib/pageCreator')
const { GatsbyNodeQuery, GatsbyAllNarrativeQuery } = require('./src/queries/ServerQuery')
const { GQLClientWrapper, GQLServerWrapper, printGraphQLError } = require(`./src/lib/graphQL`)
const { replaceSlash, replaceBothSlash, setPageName } = require(`./src/utils`)

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

/*
exports.onPostBootstrap = ({ store, reporter }) => {
  const { schema } = store.getState()
  // console.log(schema)

  reporter.info(
    schema instanceof GraphQLSchema
      ? `Hooray, a GraphQLSchema!`
      : `Boo, where's the Schema?`
  )
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  console.log( type.name )
  if (type.name === `Narrative`) {
    return {
      parentId: {
        type: GraphQLString,
        args: {
          myArgument: {
            type: GraphQLString,
          }
        },
        resolve: (source, fieldArgs) => {
          console.log(source)
          return `Id of this node is ${source.id}.
                  Field was called with argument: ${fieldArgs.myArgument}`
        }
      }
    }
  }

  // by default return empty object
  return {}
}*/

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

// re-generate index page
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Remove the leading AND traling slash from path, e.g. --> blog
  const name = page.path && setPageName( page.path )

  // in /pages: only process index page
  if ( name === 'index' ) {
    // First delete the page so it can be re-created
    deletePage(page)

    return createPage({
      ...page,
      context: {
        masterNarrativeId: `${ __MASTER_NARRATIVE }`,
      }
    })
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
