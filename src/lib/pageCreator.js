// const _ = require('lodash')

const createNarratives = (list, createPage, template) =>
  list.forEach(n => {
    console.log('in createNarratives')
    console.log(n)
    // const narrative = n.node.data.childNarratives
    // const name = n.node.data.name

    // const localizedPath = locales[lang].default
    //   ? `/categories/${_.kebabCase(category)}`
    //   : `/${locales[lang].path}/categories/${_.kebabCase(category)}`

    // const path = `/narrative/${name}`
    // createPage({
    //   path: path,
    //   component: template,
    //   context: {
    //     narrative,
    //   },
    // })
  })

module.exports = { createNarratives }
