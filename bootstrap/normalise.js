/**
 * Data preprocess from MAAS API to import into Gatsby's node
 *
 */

const crypto = require('crypto')

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

// exported functions
// narrative = top level phase
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

module.exports = {
  getIds,
  setNodeNarrative,
  setNodeNarrativeObject,
  setNodeImage,
}
