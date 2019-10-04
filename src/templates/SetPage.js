import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';
import IconLegend from "../components/IconLegend/IconLegend";

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
      <main id="main" className="set-page main">
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

                <div>
                  {`${objects.length} objects`}
                </div>
               </div>
            </section>

            <section className="section main-content">
              <div className="container container--lg">
                  <div className="set-page__content">
                  {
                    objects.map((object, j) => {
                      if (object.object)
                        return object.object.mainImage && <ItemTile key={`item-tile-${j}`} url={'/object/' + object.id} imageId={object.object.mainImage.id} objectId={object.id.toString()} hasQuote={object.notes3 !== null}/>
                    })
                  }
                  </div>
              </div>
            </section>
            <section className="section">
              <div className="container container--lg">
                <IconLegend/>
              </div>
            </section>
      </main>
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
