import React from 'react';
import {graphql, Link} from 'gatsby';
import gql from 'graphql-tag';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {handleBack, handleScrollToTop} from "../lib/navUtils";

const allObjectsPage = ({
  data,
  pageContext,
  location,
  }) => {
  let paginationItems = [];

  for(let i = 1; i <= pageContext.numPages; i++) {
    paginationItems.push(<Link to={`/all/${i > 1 ? i : ''}`}>{i}</Link>)
  }

  return (
    <Layout>
      <SEO title="All Objects"/>
      {
        data.sets.map((set, i) => {
          return (
            <section key={i}>
              <h2>{set.name}</h2>
              <div className="tiles">
                {
                  set.setObjects.map((object, j) => {
                    return (
                      <article key={i}>
                        {object.object
                          ? (
                            <Link to={'/object/' + object.object._id} className="link primary">
                              {
                                object.object.mainImage ? (
                                  <img src={object.object.mainImage.url}/>
                                ) : <div>{object.object.displayTitle}</div>
                              }
                            </Link>
                          )
                          : (
                            <div>{`Unpublished object IRN ${object._id}`}</div>
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
      }
      <section id="two">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleScrollToTop}>Top</button>
        <div>
          {paginationItems}
        </div>
      </section>
    </Layout>
)};

export default allObjectsPage;

export const pageQuery = graphql`
  query Sets($skip: Int!, $limit: Int!) {
    sets: SetsByMasterId(limit: $limit, skip: $skip) {
      id
      name
      setObjects {
        _id
        object {
          _id
          displayTitle
          mainImage {
            url
          }
        }
      }
    }
  }
`;
