
// remove trailing slashes unless it's only "/"
const replaceSlash = _path => ( _path === `/` ? _path : _path.replace(/\/$/, `` ));
// remove slashes at the begining and end
const replaceBothSlash = _path => _path.replace(/^\/|\/$/g, '');

// for setting page name
const setPageName = _path => {
  const _name = replaceBothSlash( _path );
  return _name === '' ? 'index' : _name ;
}

// not used just yet
const buildPath = ({ title }) => {
  // remove special chars
  let cleantitle = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  // change hyphen for space
  let slug = cleantitle.replace(/\s+/g, '-');
  return `/${slug}`;
}

const convertToSID = narrativeId => {
  if ( narrativeId === '6762' ) return 1;
  else if ( narrativeId === '6763' ) return 2;
  else if ( narrativeId === '6764' ) return 3;
  else if ( narrativeId === '6912' ) return 4;
  else if ( narrativeId === '6913' ) return 5;
  else if ( narrativeId === '6914' ) return 6;
  else if ( narrativeId === '6915' ) return 7;
  else if ( narrativeId === '6916' ) return 8;
  else if ( narrativeId === '6917' ) return 9;
  else if ( narrativeId === '6918' ) return 10;
  else if ( narrativeId === '6919' ) return 11;
  else if ( narrativeId === '6920' ) return 12;
}

const parseCirca = dateStr => {
  const regex = /c\./;
  // console.log(date);
  return dateStr.replace(regex, 'about');
}

const canUseDOM = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

// input = viewport size
const getBannerSize = ({ width, height }) => {
  let bannerSize;
  if (width < 767) { bannerSize = "mobile"; }
  else if (width > 767 && width < 1366) { bannerSize = "ipad"; }
  else if (width > 1366) { bannerSize = "desktop";  }
  else { bannerSize = "hi-res";  }
  return bannerSize;
}

// create image class based on viewport
const getImgOrient = ({ width, height }) => {
 let orientation;
 const aspectRatio = width / height;
 if (aspectRatio > 1) { orientation = 'landscape' }
 else if (aspectRatio < 1) { orientation = 'portrait' }
 else { orientation = 'square' }
 return orientation;
}

module.exports = { replaceSlash, replaceBothSlash, setPageName, convertToSID, parseCirca, canUseDOM, getBannerSize, getImgOrient };
