import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';
import IconLegend from "../components/Icons/IconLegend";
// import {handleBack, handleScrollToTop} from "../lib/navUtils";

const allObjectsPage = ({
  data: { Sets },
  location,
}) => (
    <Layout location={location}>
      <SEO title="All Objects"/>

      <div className="all-page">
      {
        Sets.map((set, i) => {
          return (
            <section key={`set-${i}`} className="all-page__body">
    					<div className="container container--lg">

                <h2 className="all-page__title">{set.name}</h2>

                <div className="all-page__content">
                  <div className="img-gallery">
                    <div className="img-gallery__col-grid">
                      {
                        set.setObjects.map((object, j) => {
                          if (object.object) {
                            return object.object.mainImage && (
                              <div className="img-gallery__col-grid--item" key={j}>
                                <ItemTile className="img-gallery__col-grid--item-image"
                                          key={`item-tile-${j}`}
                                          url={'/object/' + object.id}
                                          imageId={object.object.mainImage.id}
                                          objectId={`${object.id}`}
                                          hasQuote={object.notes3 !== null}
                                          />
                              </div>
                              )
                          }
                        })
                      }
                    </div>
                  </div>
                </div>

    					</div>
        		</section>
          )
        })
      }
      <section className="section">
        <div className="container container--lg">
          <IconLegend/>
        </div>
      </section>

    </div>

    </Layout>
);

export default allObjectsPage;

export const pageQuery = graphql`
  query {
    Sets: SetsByMasterId {
      id
      name
      setObjects {
        id
        notes3
        object {
          id
          displayTitle
          mainImage {
            id
            url
          }
        }
      }
    }
  }
`;
