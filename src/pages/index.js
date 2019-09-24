import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

import { siteMeta } from '../queries/fragments';

const IndexPage = ({
  data: { site, heroImage },
  location,
}) => {

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <main className="index-page">

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
      ...siteMeta
    }
    heroImage: file(relativePath: { regex: "/MAAS_SIP_MAIN.jpg/" }) {
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
