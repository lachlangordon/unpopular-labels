import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';

import { convertToSID } from '../lib/utils';

 // Narrative
const SetPage = ({
  data: { set, objects },
  pageContext,
  location,
}) => {

  return (
    <Layout>
      <SEO title={set.name} keywords={[`gatsby`, `application`, `react`]} />

      <main id="main" className="set-page main">

          <div className="no-padding">
            {
              set.id && (
                  <Banner type="ribbon" size="hi-res" themeId={ convertToSID(set.id) } />
              )
            }
          </div>

          <section className="section">
            <div className="container container--lg">

              <h1 className="set-page__title">
                { set.name }
              </h1>

              <p className="set-page__description"
                 dangerouslySetInnerHTML={{ __html: set.description }} />

            </div>
          </section>

          <section className="section section--alt">
  					<div className="container container--lg">

              <div className="all-page__content">
              {
                objects.map((object, j) => {
                  if (object.object)
                    return object.object.mainImage && <ItemTile key={`item-tile-${j}`} url={'/object/' + object.id} imageId={object.object.mainImage.id} />
                })
              }
              </div>

  					</div>
      		</section>

      </main>
    </Layout>
  );
}

export default SetPage;

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
