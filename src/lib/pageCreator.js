
const createSetPages = (list, createPage, template) =>
  list.forEach( data => {
    const setId = data.node.id
    const path = `/set/${setId}`

    console.log(`Create set pages: ${path}`)
    createPage({
      path: path,
      component: template,
      context: {
        setId,
      },
    })
  })

module.exports = { createSetPages }
