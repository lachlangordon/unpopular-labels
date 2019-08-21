import React from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';

const allObjectsPage = ({
  data: { objects }
}) => (
    <Layout>
      <SEO title="All Objects"/>
      <section id="one" className="tiles">
        {
          objects.edges.map((object, i) => {
            return (
              <article key={i}>
                {object.node.object
                  ? (
                    <Link to={'/object/' + object.node.id} className="link primary">
                      {
                        object.node.object.mainImage ? (
                          <img src={object.node.object.mainImage.url}/>
                        ) : <div>{object.node.object.name}</div>
                      }
                    </Link>
                )
                  : (
                    <div>{`Unpublished object IRN ${object.node.id}`}</div>
                  )
                }

              </article>
            )
          })
        }
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
