import React from 'react';
import { graphql, Link } from 'gatsby';

import ItemSwipe from '../components/ItemSwipe/ItemSwipe';
import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

// fragment to fetch GatsbyImageSharp
import { default_GatsbyImageSharpWithThumb } from '../queries/fragments';

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

  let related = object.parent.setObjects.filter((otherObject) => otherObject.id != object.id);

  return (
    <Layout>
      <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />

      <main className="object-page">

        <section className="section">
          <div className="container container--lg">

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

            <h1 className="object-page__title">
              { title }
            </h1>

            <div className="object-page__content">


              { object.notes2 &&
                <p className="set-page__notes2"
                   dangerouslySetInnerHTML={{ __html: object.notes2 }} />
              }

              { object.notes3 &&
                <p className="set-page__notes3"
                   dangerouslySetInnerHTML={{ __html: object.notes3 }} />
              }

              <hr />

              { object.object.acquisitionCreditLine &&
                <p className="set-page__credit-line"
                   dangerouslySetInnerHTML={{ __html: object.acquisitionCreditLine }} />
              }

              { related.length &&
                <div className="set-page__related-items">
                  <strong> Other objects in <Link to={`/set/${object.parent.id}`}>{object.parent.name}</Link> : </strong>
                  <ItemSwipe relatedItems={related} />
                </div>
              }
            </div>

          </div>
        </section>

        {/*
          <section id="two">
            <header>
              <h2>{`More in ${object.parent.name}`}</h2>
              <div className="tiles">
                {
                  related.map((object, i) => {
                    return(
                      <article key={`object-${i}`}>
                        {
                          object.object
                          ? (
                              <Link to={`/object/${object.id}`} className="link primary">
                                {
                                  object.object.mainImage ? (
                                    <img src={object.object.mainImage.url}/>
                                  ) : <div>{object.object.displayTitle}</div>
                                }
                              </Link>
                            )
                          : (
                              <div>{"Unpublished object IRN " + object.id}</div>
                            )
                        }
                      </article>
                    )
                  })
                }
              </div>
            </header>
          </section>

        */}

      </main>
    </Layout>
  )

}

export default ObjectPage;

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
        acquisitionCreditLine
        mainImage {
          url
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
              }
            }
          }
        }
      }
    }
    images: ImagesByParentId(parentId: $id) {
      id
      url
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
