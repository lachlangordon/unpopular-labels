/**
 * Data preprocess from MAAS API to import into Gatsby's node
 *
 */
 const crypto = require('crypto');

 const setInternal = ( _objectType, _object ) => {
   return {
     type: `${ _objectType }`,
     contentDigest: crypto
       .createHash(`md5`)
       .update(JSON.stringify(_object))
       .digest(`hex`),
   }
 };

// exported functions
const getIds = ( _objects ) => {
  if ( Array.isArray(_objects) ) {
    return _objects.map(obj => `${obj.id}`)
  } else {
    let objArray = []
    Object.entries(_objects).map( ([ key, value ])  => {
      if ( key === 'id' ) {  objArray[objArray.length] = `${value}` }
    })
    return objArray
  }
};

// === new normalise methods

const hasImageField = _object =>
  _object.hasOwnProperty('images') || _object.hasOwnProperty('mainImage');

const hasObject = _object =>
  _object.hasOwnProperty('narrativeObjects');

// async
const processImageField = async ( _object, parentId, helpers ) => {

  let parent = parentId || null,
      imgNodes = [];

  if ( _object.images ) {
    const { images } = _object;
    images.map( img =>
      img.id && imgNodes.push( setNodeImage({ ...img, parent }) )
    )
  }

  if ( _object.mainImage && _object.mainImage.id ) {
    const { mainImage } = _object;
    imgNodes.push( setNodeImage({ ...mainImage, parent }) )
  }

  return Promise.all(
    imgNodes.map(img => createNodeFromData(
      img,
      IMG_TYPE,
      helpers))
  );
}

// preprocess narrative objects
const processObjectField = async ( _object, parentId, helpers ) => {
  // don't process if it does not have id
  if ( !_object.id ) { reject( new Error('Gatsby Node Error: processing node object') ); }

  // narrative object = themes
  if ( _object.narrativeObjects ) {
    const { narrativeObjects } = _object;

    // object record attached inside narrativeObj
    if ( narrativeObjects.length ) {

       return Promise.all(
          narrativeObjects.map(async narrativeObj => {
              // process images
              const { object } = narrativeObj;
              if ( object ) {
                // narrative object id as parent id
                const parentObjId = narrativeObj.id;
                await processImageField(object, parentObjId, helpers);
              }

              // preprocess object
              let parent = parentId || null;
              createNodeFromData(
                setNodeSetObject({ ...narrativeObj, parent }),
                OBJ_TYPE,
                helpers
              );
          })
       )
    }
  }

}

// preprocess narrative
const processSet = async ( _Set, helpers ) => {
    // don't process if it does not have id
    if ( !_Set.id ) { return new Error('Gatsby Node Error: processing set'); }

    if (hasImageField(_Set)) {
      await processImageField( _Set, _Set.parent, helpers );
    }

    // process object in narrative
    if (hasObject(_Set)) {
      // narrativeId as parent
      await processObjectField(_Set, _Set.id, helpers);
    }

    return createNodeFromData( setNodeSet(_Set), SET_TYPE, helpers );
}


// helper function for creating nodes
const createNodeFromData = (item, nodeType, helpers) => {
  const { createNode } = helpers;

  if ( typeof createNode !== 'function' ) {
    reject( new Error('Gatsby Node Error: failed data import') );
  }

  const nodeMetadata = {
    internal: {
      type: nodeType,
      contentDigest: helpers.createContentDigest(item),
    },
  }

  const node = Object.assign({}, item, nodeMetadata)
  helpers.createNode(node)
  return node
}

// === new normalise method
const IMG_TYPE = `SetImage`;
const setNodeImage = ( _img ) => {
  return {
    id: `${ _img.id }`,
    parent: `${ _img.parent || null }`,
    url: _img.url || null,
    thumbnailSrc: _img.thumbnailURL || null,
    serverCropSrc: _img.serverCropURL|| null,
    width: _img.width,   // set min width
    height: _img.height,
    filename: _img.filename,
    caption: _img.caption || '',
  }
};

// narrative = top level phase
const SET_TYPE = `Set`;
const setNodeSet = ( _set ) => {
  return {
    id: `${ _set.id }`,
    parent: `${ _set.parent || null }`,
    children: _set.children || [],
    // other fields
    name: _set.name || '',
    summary: _set.summary || '',
    description: _set.description || '',
    lastUpdated: _set.lastUpdated || '',
    subjects: _set.subjects || [],
    keywords: _set.keywords || [],
    location: _set.location || [],
    associations: _set.associations || [],
    relatedSets: _set.relatedNarratives || [],
    // array of img ids
    tileImages: _set.tileImages || [],
    // narrative objects: an array of objects in narrative
    setObjects: _set.narrativeObjects ? _set.narrativeObjects : [],
    images: _set.images ? getIds(_set.images) : [],
    mainImage: _set.mainImage || null,
  }
};

// collections in phase
const OBJ_TYPE = `SetObject`;
const setNodeSetObject = ( _set_obj ) => {
  return {
    id: `${ _set_obj.id }`,
    parent: `${ _set_obj.parent || null }`,
    notes2: _set_obj.notes2,
    notes3: _set_obj.notes3,
    notes4: _set_obj.notes4,
    // object: this is an object instead of Array
    object : _set_obj.object ? setObject(_set_obj.object) : null,
  }
};

// object itself
const setObject = ( _object ) => {
  return {
    name: _object.displayTitle || '',
    summary: _object.summary || '',
    recordType: _object.recordType || '',
    productionNotes: _object.productionNotes || '',
    production: _object.production || null,
    significanceStatement: _object.significanceStatement || '',
    acquisitionCreditLine: _object.acquisitionCreditLine || '',
    isLoan: _object.isLoan || false,
    // images: an array of images
    images: _object.images ? getIds(_object.images) : [],
    mainImage: _object.mainImage || null,
    tracks: _object.tracks,
  }
};


module.exports = {
  getIds,
  processSet,
};
