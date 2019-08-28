import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

import sip_backdrop from '../assets/images/sip_backdrop.jpg';

const IndexPage = ({
  data: { site, masterSet },
  pageContext: {
    masterNarrativeId,
  },
  location,
}) => {
  // console.log(window)
  // return ( typeof window !== `undefined` && window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE ) ? (
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div id="main">
        <section id="one">
            <div className="inner">
                <img src={sip_backdrop}/>
                <header className="major">
                    <h2> { site.siteMetadata.title } </h2>
                </header>
                <p> { masterSet.description }</p>
                <ul className="actions">
                    <li><Link to="/themes" className="button next">Get Started</Link></li>
                </ul>
            </div>
        </section>
      </div>
    </Layout>
  )
  // ) : '<p> Loading </p>'
};

export default IndexPage;

// id: 6761
// This query is executed at build time by Gatsby.
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    masterSet: getMasterSet {
      id
      name
      summary
      description
    }
  }
`;
