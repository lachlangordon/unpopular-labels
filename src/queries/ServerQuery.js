// later move it to config
const __MASTER_NARRATIVE = 6761

// initial GQL query to generate dynamic content nodes
const GatsbyNodeQuery = `
query NodeNarratives {
  masterNarrative: narrativeById(_id: ${__MASTER_NARRATIVE}) {
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
  childNarratives: narratives (filter: {
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
        title
        summary
        images {
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
`

// This query is executed at build time by Gatsby.
const GatsbyAllNarrativeQuery = `
{
  allNarrative {
    edges {
      node {
        id
        name
      }
    }
  }
}
`

const GatsbyPageQuery = `
query NarrativePage( $narrativeId: Float! ) {
  maas {
    narrative: narrativeById ( $narrativeId ) {
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
          title
          summary
          images {
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
}
`

module.exports = { GatsbyNodeQuery, GatsbyAllNarrativeQuery, GatsbyPageQuery }
