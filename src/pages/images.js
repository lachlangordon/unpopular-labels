import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
// import Image from '../components/Image/Image'
import ImgGallery from '../components/Image/ImgGallery'
import SEO from '../components/seo'

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

    {/*
      <section>
        <div className="inner">
          <div className="box alt">
            <div className="grid-wrapper" >
            { setImages.edges.map((imgNode, i) => {

              // image node
              const imageObject = imgNode.node.fields.localFile;
              const cropCenter = imageObject.cropCenter;
              console.log(imageObject);

              return  (
                  <div key={i} className="col-4">
                    <span className="image fit">
                      <Image className="image--object"
                             // fallback url for images
                             src={cropCenter.resize.src || ''}
                             imgObject={imageObject}
                             defImgMode="fluid"
                             height={300}  />
                    </span>
                  </div>
              )
            })}
            </div>
          </div>
        </div>
      </section>

    */}

    <div className="section">
      <div className="set-page__objects container container--lg">
        <a name="objects" id="objects"></a>
        <h2>Objects in this Set</h2>

        <div className="set-page__items">

          <ImgGallery
            images={setImages.edges}
            isBreakout={true}
            type="object"
            imageTag={'On Display'}
          />

        </div>

      </div>
    </div>


    </div>
  </Layout>
)

export default ImagePage

// This query is executed at build time by Gatsby.
export const pageQuery = graphql`
  query allSetImages {
    setImages: allSetImage {
      edges {
        node {
          id
          parent {
            id
          }
          url,
          width,
          height,
          caption,
          fields {
            localFile {
              sourceInstanceName
              publicURL
              name
              absolutePath
              cropCenter: childImageSharp {
                resize(width: 300, height: 300, cropFocus: CENTER) {
                  src
                }
              }
              childImageSharp {
                fluid(maxHeight: 740) {
                  ...GatsbyImageSharpFluid
                }
                fixed(height: 500, width: 400) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
