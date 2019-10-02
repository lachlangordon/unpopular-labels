import React from 'react';
import { graphql, Link } from 'gatsby';

import ItemSwipe from '../components/ItemSwipe/ItemSwipe';
import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

// fragment to fetch GatsbyImageSharp
import { default_GatsbyImageSharpWithThumb } from '../queries/fragments';
import { saveSeenObject } from '../lib/session';

const ObjectPage = ({
  data: { images, object },
  pageContext,
  location,
}) => {

  if (!object.object) {
    return (<div>Not Web Published</div>);
  }

  let title = object.object.name;
  if (object.object.production[0]) {
    title += `, ${object.object.production[0].date}`;
  }

  console.log(images.length && images[0]);

  let related = object.parent.setObjects.filter((otherObject) => otherObject.id != object.id);
  saveSeenObject(object.id.toString());
  return (
    <Layout>
      <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />

      <main className="object-page main">
          <div className="container container--lg no-padding">
            <section className="content-header">
                <div className="object-page__mainImg">
                  {
                    images.length && (
                      <Image className="image--object"
                             imgObject={ images[0].fields.localFile }
                             defImgMode="fluid"
                             />
                    )
                  }
                </div>
            </section>

            <section className="section main-content">
                <div className="object-page__content">
                    <h1 className="object-page__title">
                      { title }
                    </h1>

                    { object.notes2 &&
                      <p className="object-page__notes2"
                         dangerouslySetInnerHTML={{ __html: object.notes2 }} />
                    }

                    { object.object.acquisitionCreditLine &&
                      <p className="object-page__credit-line"
                         dangerouslySetInnerHTML={{ __html: object.object.acquisitionCreditLine }} />
                    }
                </div>
                <div className="object-page__bottom-content">
                    { object.notes3 &&
                      <blockquote className="object-page__notes3"
                         dangerouslySetInnerHTML={{ __html: object.notes3 }} />
                    }

                    <hr />

                    { ( object.object.isLoan && object.object.significanceStatement ) &&
                      <p className="object-page__significance-statement"
                         dangerouslySetInnerHTML={{ __html: object.object.significanceStatement }} />
                    }
                </div>
            </section>
          </div>

          <div className="container container--lg no-padding">
            <section className="content-related">
                { related.length &&
                  <div className="object-page__related-items">
                    <strong> Other objects in <Link to={`/set/${object.parent.id}`}>{object.parent.name}</Link> : </strong>
                    <ItemSwipe relatedItems={related} />
                  </div>
                }
            </section>
          </div>

      </main>
    </Layout>
  )

}

export default ObjectPage;

// images[0] = main image
// parent = to find related items
export const pageQuery = graphql`
  query ObjectPage($id: String!) {
    object: setObject(id: { eq: $id }) {
      id
      notes2
      notes3
      object {
        name
        production {
          date
        }
        isLoan
        significanceStatement
        acquisitionCreditLine
        mainImage {
          id
          url
          thumbnailURL
        }
      }
      parent {
        ... on Set {
          id
          name
          setObjects {
            id
            object {
              displayTitle
              mainImage {
                id
                url
                thumbnailURL
              }
            }
          }
        }
      }
    }
    images: ImagesByParentId(parentId: $id) {
      id
      url
      thumbnailSrc
      serverCropSrc
      width
      height
      filename
      caption
      fields {
        localFile {
          ...default_GatsbyImageSharp
        }
      }
    }
  }
`;
