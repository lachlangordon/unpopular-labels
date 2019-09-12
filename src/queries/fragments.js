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
// export const cropCenter = graphql`
//   fragment cropCenter on localFile {
//     childImageSharp {
//       resize(width: 300, height: 300, cropFocus: CENTER) {
//         src
//       }
//     }
//   }
// `
