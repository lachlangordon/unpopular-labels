import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';

const allObjectsPage = ({
  data: { Set },
  location,
}) => (
    <Layout location={location}>
      <SEO title="Audio Files"/>

      <div className="all-page">
          <section className="all-page__body container container--lg">
              <h2>Robert Rosen
                  <br/>
                  <span>audio files</span>
              </h2>
              <div className="description">
                  {Set.description}
              </div>
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
);

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
