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

  return (
    <Layout>
      <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <span className="image main"><img src={object.object.mainImage.url} alt="" /></span>
            <header>
              <h1>{object.object.name}</h1>
            </header>
            <p>{object.notes2}</p>
            <p>{object.notes3}</p>
            <p>{object.object.acquisitionCreditLine}</p>
          </div>
        </section>
        <section id="two">
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
    }
  }
`