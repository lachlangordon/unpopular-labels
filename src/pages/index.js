import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

const IndexPage = ({
  data: { site, masterSet, heroImage },
  pageContext: {
    masterNarrativeId,
  },
  location,
}) => {

  let pageTitle = `JENNY KEE&nbsp; &nbsp;LINDA JACKSON<br>`;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <main className="guide-index-page">
        <div className="guide-index-page__main">

          <div className="container container--lg no-padding">
            <BgImage title="before"
                     fluid={heroImage.childImageSharp.fluid}>

                <h2 className="guide-index-page__title" style={{ color: '#fff'}}>
                    { site.siteMetadata.title }
                </h2>

                <ul className="actions">
                    <li><Link to="/themes" className="button next">Get Started</Link></li>
                </ul>
            </BgImage>
          </div>

        </div>
      </main>

    </Layout>
  )

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
    heroImage: file(relativePath: { regex: "/sip_backdrop.jpg/" }) {
      id
      url
      sourceInstanceName
      publicURL
      name
      absolutePath
      childImageSharp {
        fluid(maxWidth: 1140) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
