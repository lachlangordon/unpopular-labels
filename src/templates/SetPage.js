import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';

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

              {/*
                <div className="flex-grid">
                {
                  objects.map((object, i) => {
                    return (
                      <article key={`object-${i}`} className="flex-grid-item">
                        {
                          object.object
                            ? (
                                <Link to={'/object/' + object.id} className="link primary">
                                  {
                                    object.object.mainImage ? (
                                      <Image className="image--object box crop-to-fit"
                                              // fallback url for images
                                              src={object.object.mainImage.url} />
                                    ) : <div>{object.object.name}</div>
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
              */}


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
