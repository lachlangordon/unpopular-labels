import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout/Layout'
import SEO from '../components/seo';


const AllPaginated = ({
  data,
  pageContext,
  location,
  }) => {
  let paginationItems = [];

  for(let i = 1; i <= pageContext.numPages; i++) {
    paginationItems.push(<Link key={i} to={`/all/${i > 1 ? i : ''}`}>{i}</Link>);
  }

  return (
    <Layout location={location}>
      <SEO title="All Objects"/>
      {
        data.sets.map((set, i) => {
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
      }
      <section id="two">
        <div>
          {paginationItems}
        </div>
      </section>
    </Layout>
)};

export default AllPaginated;

export const pageQuery = graphql`
  query AllPaginatedPage($skip: Int!, $limit: Int!) {
    sets: SetsByMasterId(limit: $limit, skip: $skip) {
      id
      name
      setObjects {
        id
        object {
          id
          displayTitle
          mainImage {
            url
          }
        }
      }
    }
  }
`;
