/**
 * Data preprocess from MAAS API to import into Gatsby's node
 *
 */

const crypto = require('crypto');

// later move it to config
const __MASTER_NARRATIVE = 6761;

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
const processImageField = async ( _object, createNode, parentId ) => {

  return new Promise((resolve, reject) => {

      if ( typeof createNode !== 'function' ) {
        reject( new Error('Error - Gatsby image import') );
      }

      let parent = parentId || null;

      if ( _object.images ) {
        const { images } = _object;
        images.map( img => {
          const _image = setNodeImage({ ...img, parent });
          createNode(_image);
        })
      }

      if ( _object.mainImage ) {
        const { mainImage } = _object;
        const _mainImage =  setNodeImage({ ...mainImage, parent })
        console.log(_mainImage);
        createNode(_mainImage);
      }

      resolve();
    })
}

// preprocess narrative objects
const processObjectField = async ( _object, createNode, parentId ) => {

  return new Promise((resolve, reject) => {

    // don't process if it does not have id
    if ( !_object.id &&
        typeof createNode !== 'function' ) { reject( new Error('Error - Gatsby object import') ); }

    // narrative object = themes
    if ( _object.narrativeObjects ) {
      const { narrativeObjects } = _object;

      // object record attached inside narrativeObj
      if ( narrativeObjects.length ) {

        narrativeObjects.map(async narrativeObj => {
            // narrative object id as parent id
            const parentObjId = narrativeObj.id;

            // process images
            const { object } = narrativeObj;
            if ( object ) {
              await processImageField(object, createNode, parentObjId);
            }

            // preprocess object
            let parent = parentId || null;
            normalisedObj = setNodeSetObject({ ...narrativeObj, parent });
            console.log(`importing objects - themeId: %s vs. objectParent: %s`, parent, parentObjId);
            createNode(normalisedObj);
        });

        resolve();
      }
    }

  })
}

// preprocess narrative
const processSet = async ( _Set, createNode ) => {

    // don't process if it does not have id
    if ( !_Set.id &&
        typeof createNode !== 'function' ) { return new Error('Error - Gatsby node import'); }

    if (hasImageField(_Set)) {
      await processImageField(_Set, createNode, _Set.parent);
    }

    // process object in narrative
    if (hasObject(_Set)) {
      // narrativeId as parent
      await processObjectField(_Set, createNode, _Set.id);
    }

    const _nodeSet = setNodeSet( _Set );
    // console.log( _nodeSet )
    return createNode(_nodeSet);
}

// === new normalise method

const setNodeImage = ( _img ) => {
  const IMG_TYPE = `SetImage`;
  return {
    id: `${ _img.id }`,
    parent: `${ _img.parent || null }`,
    internal: setInternal( IMG_TYPE, _img ),
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
const setNodeSet = ( _set ) => {
  const SET_TYPE = `Set`;
  return {
    id: `${ _set.id }`,
    parent: `${ _set.parent || null }`,
    children: _set.children || [],
    internal: setInternal( SET_TYPE, _set ),
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
const setNodeSetObject = ( _set_obj ) => {
  const OBJ_TYPE = `SetObject`;
  return {
    id: `${ _set_obj.id }`,
    parent: `${ _set_obj.parent || null }`,
    internal: setInternal( OBJ_TYPE, _set_obj ),
    notes2: _set_obj.notes2,
    notes3: _set_obj.notes3,
    // object: this is an object instead of Array
    object : _set_obj.object ? setObject(_set_obj.object) : null,
  }
};

// object itself
const setObject = ( _object ) => {
  return {
    name: _object.displayTitle || '',
    summary: _object.summary || '',
    productionNotes: _object.productionNotes || '',
    production: _object.production || null,
    significanceStatement: _object.significanceStatement || '',
    acquisitionCreditLine: _object.acquisitionCreditLine || ',',
    isLoan: _object.isLoan || false,
    // images: an array of images
    images: _object.images ? getIds(_object.images) : [],
    mainImage:  _object.mainImage || null,
  }
};

module.exports = {
  getIds,
  processSet,
};
