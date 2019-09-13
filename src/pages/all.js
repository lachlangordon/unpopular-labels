import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';
// import {handleBack, handleScrollToTop} from "../lib/navUtils";

const allObjectsPage = ({
  data: { Sets }
}) => (
    <Layout>
      <SEO title="All Objects"/>

      <main id="main" className="all-page main">
      {
        Sets.map((set, i) => {
          return(
            <section key={`set-${i}`} className="all-page__body">
    					<div className="container container--lg">

                <h2 className="all-page__title">{set.name}</h2>

                  <div className="all-page__content">
                  {
                    set.setObjects.map((object, j) => {
                      if (object.object)
                        return object.object.mainImage && <ItemTile key={`item-tile-${j}`} url={'/object/' + object.id} imageId={object.object.mainImage.id} />
                    })
                  }
                  </div>

    					</div>
        		</section>
          )
        })
      }
      </main>

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
