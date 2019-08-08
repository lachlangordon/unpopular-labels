import React from 'react'
import { graphql, Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Layout from '../components/Layout/Layout'
import Image from '../components/Image/Image'
import SEO from '../components/seo'

import pic03 from '../assets/images/pic03.jpg'

const ImagePage = ({
  data: { localImages, setImages },
  pageContext: { parentId, masterNarrativeId },
  location,
}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div id="main">

    <section>
      <div className="inner">
          <header className="major">
              <h2> Themes Title </h2>
          </header>
          <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem.
          In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt.
          Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
      </div>
    </section>

    <section>
      <div className="inner">
        <div className="box alt">
          <div className="grid-wrapper" >
          { setImages.edges.map(imgNode => (
              <div key={imgNode.node.id} className="col-4">
                <span className="image fit"> <Image imgNode={imgNode} /> </span>
              </div>
          ))}
          </div>
        </div>
      </div>
    </section>



    </div>
  </Layout>
)

export default ImagePage

// This query is executed at build time by Gatsby.
export const pageQuery = graphql`
  query allSetImages {
    localImages: allFile (
      filter: {
        sourceInstanceName: { ne: "__PROGRAMMATIC__" }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          id
          url
          parent {
            id
          }
          sourceInstanceName
          publicURL
          name
          absolutePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 210, height: 197) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    setImages: allSetImage {
      edges {
        node {
          id
          parent {
            id
          }
          url
          fields {
            localFile {
              sourceInstanceName
              publicURL
              name
              absolutePath
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 210, height: 197) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
