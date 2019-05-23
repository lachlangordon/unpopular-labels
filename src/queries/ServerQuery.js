// later move it to config
const __MASTER_NARRATIVE = 6761

// This query is executed at build time by Gatsby.
// filter: { masterNarrative: 6761 }
// filter: { _ids: [ 6761, 6762, 6763, 6764 ] }
const GatsbyQuery = `
  maas {
    masterNarrative: narrativeById (_id: ${__MASTER_NARRATIVE}) {
      _id
      title
      summary
      description
      lastUpdated
    }
    childNarratives: narratives (filter: {
      masterNarrative: ${__MASTER_NARRATIVE}
    }) {
      _id
      title
      summary
      description
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
    }
  }
`

const GatsbyIndexQuery = `
query {
  maas {
    narrativeById (_id: 6761) {
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
    narratives (filter: {
      _ids: [6761, 6762, 6763, 6764]
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
          productionNotes
        }
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

module.exports = { GatsbyQuery, GatsbyIndexQuery, GatsbyPageQuery }
