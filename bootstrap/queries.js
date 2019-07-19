/**
 * Server Queries to bootstrap Gatsby
 *
 */

// later move it to config
const __MASTER_NARRATIVE = 6761

// initial GQL query to generate dynamic content nodes
const GatsbyNodeQuery = `
query NodeSets {
  masterSet: narrativeById(_id: ${__MASTER_NARRATIVE}) {
    _id
    title
    summary
    description
    subjects
    associations
    keywords
    location
    lastUpdated
  }
  childSets: narratives (filter: {
    masterNarrative: ${__MASTER_NARRATIVE}
  }) {
    _id
    title
    summary
    description
    subjects
    associations
    keywords
    location
    lastUpdated
    tileImages
    relatedNarratives {
      _id
    }
    mainImage {
			_id
      url
      width
      height
    }
    images {
			_id
      url
      width
      height
      caption
    }
    narrativeObjects {
      _id
      notes2
      notes3
      object {
        _id
        parentId
        displayTitle
        summary
        acquisitionCreditLine
        production {
		      date
		    }
        images {
          _id
          url
          width
          height
          caption
        }
        mainImage {
          _id
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
      }
    }
  }
}
`
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
`

const GatsbyAllImageQuery = `
{
  allImage (sort:{ fields: id, order:ASC }) {
    edges {
      node {
        id
        url
        width
        height
        caption
      }
    }
  }
}
`

module.exports = {
  GatsbyNodeQuery,
  GatsbyAllSetQuery,
  GatsbyAllSetObjectQuery,
  GatsbyAllImageQuery,
}
