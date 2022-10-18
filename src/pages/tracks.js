import React from 'react';
import { graphql, useScrollRestoration } from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTileByPath from '../components/ItemTile/ItemTileByPath';
import SEO from '../components/seo';

const allTracksPage = ({
  data: { Set, site },
  location,
}) => {

    return (
        <Layout location={location}>
          <SEO title="Audio Files"/>

          <div className="all-page">
              <section className="all-page__body container container--lg">
                  <h1>{site.siteMetadata.shortTitle}</h1>
                  <div className="objects">
                      {
                          Set.setObjects.map((object, i) => {
                              if (object.object) {

                                  const imgCheck = object.object.mainImage.imagePath && object.object.mainImage.filename;
                                  return imgCheck && (
                                      <ItemTileByPath
                                          className="row-item"
                                          key={`item-tile-${i}`}
                                          url={'/track/' + object.id}
                                          imgPath={object.object.mainImage.imagePath}
                                          imgFilename={object.object.mainImage.filename}
                                          objectId={`${object.id}`}
                                          title={object.object.displayTitle}
                                          subtitle={object.object.subtitle}
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

export default allTracksPage;

export const pageQuery = graphql`
  query {
    Set: getMasterSet {
        description
        setObjects {
            id
            notes2
            object {
                displayTitle
                subtitle
                mainImage {
                    id
                    imagePath
                    filename
                }
            }
        }
    }
    site {
      ...siteMeta
    }
  }
`;
