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

// top level phase
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
    name: _narrative.title || '',
    summary: _narrative.summary || '',
    description: _narrative.description || '',
    lastUpdated: _narrative.lastUpdated || '',
    subjects: _narrative.subjects || [],
    keywords: _narrative.keywords || [],
    location: _narrative.location || [],
    associations: _narrative.associations || [],
    // todo: narrative object - neeeded to be normalised (_id to id String!)
    // narrativeObjects: _narrative.narrativeObjects || [],
    relatedNarratives: _narrative.relatedNarratives || [],
    images: _narrative.images || [],
    tileImages: _narrative.tileImages || [],
    mainImage: _narrative.mainImage || null,
  }
}

// collections in phase
const setNodeNarrativeObject = ( _narrative_obj , parentId ) => {
    return {
      id: `${ _narrative_obj._id }`,
      parent: `${ parentId }`,
      internal: {
        type: `NarrativeObject`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(_narrative_obj))
          .digest(`hex`),
      },
      // todo: object - neeeded to be normalised (_id to id String!)
      // object : _narrative_obj.object || {},
      notes2: _narrative_obj.notes2,
      notes3: _narrative_obj.notes3,
    }
}

// object itself
const setNodeObject = ( _object, parentId ) => {
    return {
      id: `${ _object._id }`,
      parent: `${ _object.parentId }` || `${ parentId }`,
      internal: {
        type: `Object`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(_object))
          .digest(`hex`),
      },
      name: _object.title || '',
      summary: _object.summary || '',
      images: _object.images || [],
      productionNotes: _object.productionNotes || '',
    }
}

// to do: preprocess images
const setNodeImage = ( _img, parentId ) => {
    // don't process if it does not have url
    if ( !_img.url ) { return }

    return {
      id: `${ _img._id }`,
      parent: `${ _img.parentId }` || `${ parentId }`,
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
  const { createNode } = actions

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
      let child_ids = []
      childNarratives.forEach(n => {
        // create child narrative nodes
        const _node = setNodeNarrative(n)
        const _cid = _node.id
        createNode(_node)
        child_ids.push(_cid)

        // check for linked narrative objects
        if ( n.narrativeObjects.length ) {

          n.narrativeObjects.forEach(nobj => {
            const _nobj = setNodeNarrativeObject(nobj, _cid)
            // console.log(nobj.object)

            // check for linked objects
            if ( nobj.object ) {
              const _obj = setNodeObject(nobj.object, _nobj.id)
              console.log(_obj)

              // check for images
              if ( nobj.object.images.length ) {
                const { images } = nobj.object
                images.forEach (img => {
                  const _img = setNodeImage(img, _obj.id)
                  console.log(_img)
                })
              }
            }
          })
        }
      })

      // console.log(child_ids)
      // create master narrative
      const _master =  {
        ...setNodeNarrative(masterNarrative),
        children: child_ids,
        parent: `null`,
      }
      createNode(_master)

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
