import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout/Layout';
import ItemTile from '../components/ItemTile/ItemTile';
import SEO from '../components/seo';


const allObjectsPage = ({
  data: { Sets },
  pageContext,
  location,
  }) => {

  return (
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

      {/*
         Sets.map((set, i) => {
          return (
            <section key={`set-${i}`}>
              <h2>{set.name}</h2>
              <div className="tiles">
                {
                  set.setObjects.map((object, j) => {
                    return (
                      <article key={`object-${j}`}>
                        {object.object
                          ? (
                            <Link to={'/object/' + object.object.id} className="link primary">
                              {
                                object.object.mainImage ? (
                                  <img src={object.object.mainImage.url}/>
                                ) : <div>{object.object.displayTitle}</div>
                              }
                            </Link>
                          )
                          : (
                            <div>{`Unpublished object IRN ${object.id}`}</div>
                          )
                        }
                      </article>
                    )
                  })
                }
              </div>
            </section>
          )
        })
      */}
    </Layout>
)};

export default allObjectsPage;

export const pageQuery = graphql`
  query Sets {
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
