/**
 * Server Queries to bootstrap Gatsby
 *
 */

// later move it to config
const __MASTER_NARRATIVE = process.env.MASTER_NARRATIVE;

// initial GQL query to generate dynamic content nodes
const GatsbyNodeQuery = `
query NodeSets {
  masterSet: narrativeById(_id: ${__MASTER_NARRATIVE}) {
    id: _id
    name: title
    summary
    description
    subjects
    associations
    keywords
    location
    lastUpdated
    mainImage {
      id: _id
      refId: id
      filename: identifier
      url
      thumbnailURL: url(width: 70, height: 70, smart: true)
      serverCropURL: url(width: 400, height: 400, smart: true)
      width
      height
      caption
    }
    narrativeObjects {
      id: _id
      notes2
      notes3
      notes4
      object {
        id: _id
        displayTitle
        subtitle
        tracks {
          title
          description
          url
        }
        mainImage {
          id: _id
          refId: id
          filename: identifier
          url
          thumbnailURL: url(width: 70, height: 70, smart: true)
          serverCropURL: url(width: 400, height: 400, smart: true)
          width
          height
          caption
        }
      }
    }
  }
}
`;

// This query is executed at build time by Gatsby.
const GatsbyAllSetQuery = `
{
  allSet(sort:{ fields: id, order:ASC }) {
    edges {
      node {
        id
        name
        summary
        description
        setObjects {
          object {
            displayTitle
            subtitle
            mainImage {
              url
              width
              height
            }
          }
        }
      }
    }
  }
}
`;

const GatsbyAllSetObjectQuery = `
{
  allSetObject(sort:{ fields: id, order:ASC }) {
    edges {
      node {
        id
        object {
          name
          mainImage {
            url
          }
          tracks {
            title
            description
            url
          }
        }
        notes2
        notes3
        notes4
      }
    }
  }
}
`;

const GatsbyAllImageQuery = `
{
  allImage (sort:{ fields: id, order:ASC }) {
    edges {
      node {
        id
        url
        width
        height
      }
    }
  }
}
`;

module.exports = {
  GatsbyNodeQuery,
  GatsbyAllSetQuery,
  GatsbyAllSetObjectQuery,
  GatsbyAllImageQuery,
};
