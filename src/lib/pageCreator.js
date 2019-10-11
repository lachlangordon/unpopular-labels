
const createDynamicPages = (type, list, createPage, template) =>
  list.forEach( data => {
    const id = data.node.id;
    const path = `/${type}/${id}`;

    createPage({
      path: path,
      component: template,
      context: {
        id,
      },
    });
  })


const createPaginatedPages = (type, list, createPage, template, itemsPerPage) => {
  const path = `/${type}`;
  const numPages = Math.ceil(list.length / itemsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? path : `${path}/${i + 1}`,
      component: template,
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  });
}

const createPaginatedSetPages = (type, list, createPage, template, itemsPerPage, paginationItemsKey) =>
  list.forEach( data => {
    const id = data.node.id;
    const path = `/${type}/${id}`;

    const objects = data.node[paginationItemsKey];
    const numPages = Math.ceil(objects.length / itemsPerPage);

    Array.from({length: numPages}).forEach((_, i) => {

      createPage({
        path: i === 0 ? path : `${path}/${i + 1}`,
        component: template,
        context: {
          id,
          limit: itemsPerPage,
          skip: i * itemsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  })

module.exports = { createDynamicPages, createPaginatedPages, createPaginatedSetPages };
