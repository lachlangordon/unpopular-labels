/**
 * Data preprocess from MAAS API to import into Gatsby's node
 *
 */

const crypto = require('crypto')

// later move it to config
const __MASTER_NARRATIVE = 6761

const setInternal = ( _objectType, _object ) => {
  return {
    type: `${ _objectType }`,
    contentDigest: crypto
      .createHash(`md5`)
      .update(JSON.stringify(_object))
      .digest(`hex`),
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

// exported functions
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

// narrative = top level phase
const setNodeSet = ( _set ) => {
  // don't process if it does not have id
  if ( !_set._id ) { return }

  return {
    id: `${ _set._id }`,
    parent: `${ _set.parent || null }`,
    children: _set.children || [],
    internal: setInternal( `Set`, _set ),
    name: _set.title || '',
    summary: _set.summary || '',
    description: _set.description || '',
    lastUpdated: _set.lastUpdated || '',
    subjects: _set.subjects || [],
    keywords: _set.keywords || [],
    location: _set.location || [],
    associations: _set.associations || [],
    // narrative objects: an array of objects in narrative
    setObjects: _set.narrativeObjects ? getIds(_set.narrativeObjects) : [],
    relatedSets: _set.relatedNarratives || [],
    images: _set.images || [],
    tileImages: _set.tileImages || [],
    mainImage: _set.mainImage || null,
  }
}

// collections in phase
const setNodeSetObject = ( _set_obj ) => {
  // don't process if it does not have id
  if ( !_set_obj._id ) { return }

  return {
    id: `${ _set_obj._id }`,
    parent: `${ _set_obj.parent || null }`,
    internal: setInternal( `SetObject`, _set_obj ),
    notes2: _set_obj.notes2,
    notes3: _set_obj.notes3,
    // object: this is an object instead of Array
    object : _set_obj.object ? setObject(_set_obj.object) : null,
  }
}

const setNodeImage = ( _img ) => {
  // don't process if it does not have url/id
  if ( !_img.url || !_img._id ) { return }

  return {
    id: `${ _img._id }`,
    parent: `${ _img.parent || null }`,
    internal: setInternal( `SetImage`, _img ),
    url: _img.url,
    width: _img.width || 300,   // set min width
    height: _img.height,
    caption: _img.caption || '',
  }
}

module.exports = {
  getIds,
  setNodeSet,
  setNodeSetObject,
  setNodeImage,
}
