import { graphql } from 'gatsby';

export const siteMeta = graphql`
  fragment siteMeta on Site {
    siteMetadata {
      siteUrl
      title
      description
    }
  }
`

// used by ImageByPath
// relativeDirectory is important
export const default_GatsbyImageSharp = graphql`
  fragment default_GatsbyImageSharp on File {
    id
    url
    sourceInstanceName
    publicURL
    name
    relativePath
    relativeDirectory
    absolutePath
    childImageSharp {
      fluid(maxHeight: 740) {
        ...GatsbyImageSharpFluid
        originalName
      }
    }
  }
`

// cropFocus: CENTER, fit: CONTAIN, background: "#393939"
// cropFluid - thumbnail is important
// used by ImageById
export const default_GatsbyImageSharpWithThumb = graphql`
  fragment default_GatsbyImageSharpWithThumb on File {
    id
    url
    sourceInstanceName
    publicURL
    name
    relativePath
    relativeDirectory
    absolutePath
    thumbnail: childImageSharp {
      fluid(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpFluid
      }
    }
    childImageSharp {
      fluid(maxHeight: 740) {
        ...GatsbyImageSharpFluid
        originalName
      }
    }
  }
`
