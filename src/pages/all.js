import React from 'react';
import { graphql } from 'gatsby';
import Masonry from 'react-masonry-component';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";
import IconLegend from "../components/Icons/IconLegend";

const allObjectsPage = ({
  data: { Sets },
  location,
}) => {

  return (
    <Layout location={location}>
      <SEO title="All Objects"/>

      <div className="all-page">
        {
          Sets.map((set, i) => {

            const tiles = set.setObjects.map((object, j) => {
              if (object.object) {

                return object.object.mainImage && (
                  <ItemTile className="img-gallery__col-grid--item img-gallery__col-grid--item-image"
                            key={`item-tile-${j}`}
                            url={'/object/' + object.id}
                            imageId={object.object.mainImage.id}
                            objectId={`${object.id}`}
                            title={object.object.displayTitle}
                            hasQuote={object.notes3 !== null}
                            useBase64={j < 10 && i === 0}
                  />
                )
              }
            });

            return (
              <section key={`set-${i}`} className="all-page__body container container--lg">
                <h2 className="all-page__title">{set.name}</h2>
                <Masonry className="img-gallery img-gallery__col-grid" options={{transitionDuration: 0}}>
                  {tiles}
                </Masonry>
              </section>
            )
          })
        }
        <section className="section">
          <div className="container container--lg">
            <NavigationButtons/>
          </div>
        </section>
        <section className="section">
          <div className="container container--lg">
            <IconLegend/>
          </div>
        </section>

      </div>

    </Layout>
  )
} ;

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
