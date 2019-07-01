
// remove trailing slashes unless it's only "/"
const replaceSlash = _path => ( _path === `/` ? _path : _path.replace(/\/$/, `` ))
// remove slashes at the begining and end
const replaceBothSlash = _path => _path.replace(/^\/|\/$/g, '')

// for setting page name
const setPageName = _path => {
  const _name = replaceBothSlash( _path )
  return _name === '' ? 'index' : _name
}

// not used just yet
const buildPath = ({ title }) => {
  // remove special chars
  let cleantitle = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
  // change hyphen for space
  let slug = cleantitle.replace(/\s+/g, '-')
  return `/${slug}`
}

module.exports = { replaceSlash, replaceBothSlash, setPageName }
