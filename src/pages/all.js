import React from 'react';
import {graphql, Link} from 'gatsby';
import gql from 'graphql-tag';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {handleBack, handleScrollToTop} from "../lib/navUtils";

const allObjectsPage = ({
  data
  }) => (
    <Layout>
      <SEO title="All Objects"/>
      <section id="one" className="tiles">
        {
          data.objects.edges.map((object, i) => {
            return (
              <article key={i}>
                {object.node.object
                  ? (
                    <Link to={'/object/' + object.node.id}>
                      {
                        object.node.object.mainImage ? (
                          <img src={object.node.object.mainImage.url}/>
                        ) : <div>{object.node.object.name}</div>
                      }
                    </Link>
                )
                  : (
                    <div>{"Unpublished object IRN " + object.node.id}</div>
                  )
                }

              </article>
            )
          })
        }
      </section>
      <section id="two">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleScrollToTop}>Top</button>
      </section>
    </Layout>
);

export default allObjectsPage;

export const pageQuery = graphql`
  query {
    objects: allSetObject {
      edges {
        node {
          id
          object {
            name
            mainImage {
              url
            }
          }
        }
      }
    }
  }
`;
