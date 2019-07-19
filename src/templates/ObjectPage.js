import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import {handleBack, handleScrollToTop} from '../lib/navUtils';

const ObjectPage = ({
  data: {object},
  pageContext,
  location,
}) => {

  let title = object.object.name;
  if (object.object.production[0]) {
    title += `, ${object.object.production[0].date}`;
  }

  console.log(typeof object.parent.setObjects);
  console.log(typeof object.id);
  let related = object.parent.setObjects.filter((otherObject) => otherObject.id != object.id);

  return (
    <Layout>
      <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            {
              object.object.mainImage && (
                <span className="image main"><img src={object.object.mainImage.url} alt="" /></span>
              )
            }
            <header>
              <h1>{title}</h1>
            </header>
            <p>Part of <Link to={`/theme/${object.parent.id}`}>{object.parent.name}</Link></p>
            <p>{object.notes2}</p>
            <p>{object.notes3}</p>
            <p>{object.object.acquisitionCreditLine}</p>
          </div>
        </section>
        <section id="two">
          <header>
            <h2>{`More in ${object.parent.name}`}</h2>
            <div className="tiles">
              {
                related.map((object, i) => {
                  return(
                    <article key={i}>
                      {
                        object.object
                        ? (
                            <Link to={`/object/${object.id}`} className="link primary">
                              {
                                object.object.mainImage ? (
                                  <img src={object.object.mainImage.url}/>
                                ) : <div>{object.object.displayTitle}</div>
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
          </header>
        </section>
        <section id="three">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleScrollToTop}>Top</button>
        </section>
      </div>
    </Layout>
  );

};

export default ObjectPage

export const pageQuery = graphql`
  query ObjectPage($id: String!) {
    object: setObject(id: { eq: $id }) {
      id
      notes2
      notes3
      object {
        name
        production {
          date
        }
        acquisitionCreditLine
        mainImage {
          url
        }
      }
      parent {
        ... on Set {
          id
          name
          setObjects {
            id: _id
            object {
              displayTitle
              mainImage {
                url
              }
            }
          }
        }
      }
    }
  }
`;