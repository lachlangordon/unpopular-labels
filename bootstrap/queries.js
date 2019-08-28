/**
 * Server Queries to bootstrap Gatsby
 *
 */

// later move it to config
const __MASTER_NARRATIVE = 6761;

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
      width
      height
      caption
    }
  }
  childSets: narratives (filter: {
    masterNarrative: ${__MASTER_NARRATIVE}
  }) {
    id: _id
    name: title
    summary
    description
    subjects
    associations
    keywords
    location
    lastUpdated
    tileImages
    relatedNarratives {
      id: _id
    }
    mainImage {
      id: _id
      refId: id
      filename: identifier
      url
      width
      height
      caption
    }
    images {
      id: _id
      refId: id
      filename: identifier
      url
      width
      height
      caption
    }
    narrativeObjects {
      id: _id
      notes2
      notes3
      object {
        id: _id
        parentId
        displayTitle
        summary
        isLoan
        acquisitionCreditLine
        production {
		      date
		    }
        images {
          id: _id
          refId: id
          filename: identifier
          url
          width
          height
          caption
        }
        mainImage {
          id: _id
          refId: id
          filename: identifier
          url
          width
          height
          caption
        }
        productionNotes
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
        tileImages
        setObjects {
          object {
            displayTitle
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
          production {
            date
          }
          acquisitionCreditLine
          mainImage {
            url
          }
        }
        notes2
        notes3
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