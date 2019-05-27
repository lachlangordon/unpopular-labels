// const _ = require('lodash')

const createNarratives = (list, createPage, template) =>
  list.forEach( data => {
    console.log('in createNarratives')
    const narrativeId = data.node.id
    const path = `/narrative/${narrativeId}`
    createPage({
      path: path,
      component: template,
      context: {
        narrativeId,
      },
    })
  })

module.exports = { createNarratives }
