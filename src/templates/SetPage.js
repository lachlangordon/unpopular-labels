import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';

import NavigationButtons from "../components/NavigationButtons/NavigationButtons";
import IconLegend from "../components/Icons/IconLegend";

import withViewport from '../decorators/withViewport';

import { convertToSID, getBannerSize } from '../lib/utils';

 // Narrative
const SetPage = ({
  data: { set, objects },
  pageContext,
  location,
  viewport
}) => {
  let bannerSize = getBannerSize(viewport);
  return (
    <Layout location={location}>
      <SEO title={set.name} keywords={[`gatsby`, `application`, `react`]} />
      <div className="set-page">
        <div>
            <section className="content-header">
              { set.id && (
                    <Banner className="no-padding" type="ribbon" size={ bannerSize } themeId={ convertToSID(set.id) } />
                )
              }

              <div className="container container--lg">
                  <h1 className="set-page__title">
                    { set.name }
                  </h1>

                  <div className="set-page__description"
                     dangerouslySetInnerHTML={{ __html: set.description }} />

                  <div className="set-page__info">
                    <span className="set-page__object-count">{`${objects.length} objects`}</span>
                    <hr /> <IconLegend/>
                  </div>

               </div>
            </section>
            <section className="section main-content">
              <div className="container container--lg">
                  <div className="set-page__content">
                  {
                    <div className="img-gallery">
                      <div className="img-gallery__col-grid">
                        {
                          objects.map((object, j) => {
                            if (object.object) {
                              return object.object.mainImage && (
                                <div className="img-gallery__col-grid--item" key={j}>
                                  <ItemTile className="img-gallery__col-grid--item-image"
                                            key={`item-tile-${j}`}
                                            url={'/object/' + object.id}
                                            objectId={`${object.id}`}
                                            imageId={object.object.mainImage.id}
                                            hasQuote={object.notes3 !== null}
                                        />
                                </div>
                              )
                            }
                        })
                      }
                      </div>
                    </div>
                  }
                  </div>
              </div>
            </section>
        </div>
          <section className="section full-width">
            <div className="container container--lg">
              <NavigationButtons/>
            </div>
          </section>
      </div>
    </Layout>
  );
}

export default withViewport(SetPage);

export const pageQuery = graphql`
query SetPage( $id: String!) {
  set( id: { eq: $id } ) {
    id
    name
    summary
    description
  }
  objects: SetObjectsByParentId(parentId: $id) {
    id
    notes3
    object {
      name
      mainImage {
        id
        url
      }
    }
  }
}
`;
