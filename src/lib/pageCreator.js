const createDynamicPages = (type, list, createPage, template) =>
  list.forEach( data => {
    const id = data.node.id
    const path = `/${type}/${id}`

    console.log(`Creating page: ${path}`)
    createPage({
      path: path,
      component: template,
      context: {
        id,
      },
    })
  })

module.exports = { createDynamicPages }
