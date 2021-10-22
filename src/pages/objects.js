import React from 'react';
import { graphql, useScrollRestoration } from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';

const allObjectsPage = ({
  data: { Set },
  location,
}) => {
    return (
        <Layout location={location}>
          <SEO title="Audio Files"/>

          <div className="all-page">
              <section className="all-page__body container container--lg">
                  <h1>Robert Rosen
                      <br/>
                      <span>audio files</span>
                  </h1>
                  <div className="description" dangerouslySetInnerHTML={{__html: Set.description}}/>
                  <div className="objects">
                      {
                          Set.setObjects.map((object, i) => {
                              if (object.object) {
                                  return object.object.mainImage && (
                                      <ItemTile
                                          className="row-item"
                                          key={`item-tile-${i}`}
                                          url={'/object/' + object.id}
                                          imageId={object.object.mainImage.id}
                                          objectId={`${object.id}`}
                                          title={object.notes2}
                                      />
                                  )
                              }
                          })
                      }
                  </div>
            </section>

        </div>

        </Layout>
    )
};

export default allObjectsPage;

export const pageQuery = graphql`
  query {
    Set: getMasterSet {
        description
        setObjects {
            id
            notes2
            object {
                mainImage {
                    id
                    url
                }
            }
        }
    }
  }
`;
