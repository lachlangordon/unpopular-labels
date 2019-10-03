import React from 'react';
import { graphql, Link } from 'gatsby';
import { scale } from '../lib/typography';

import Layout from '../components/Layout/Layout';
import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

const IndexPage = ({
  data: { site, heroImage },
  location,
}) => {

  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="index-page">
          <div className="container container--lg no-padding">
            <BgImage imgObject={ heroImage }>

                <h2 className="guide-index-page__title"
                    style={{ ...scale(2) }}>
                  <span className="text__fadeIn"> STEP </span>
                  <span className="text__fadeIn"> INTO </span>
                  <span className="text__fadeIn"> PARADISE </span>
                </h2>

                <ul className="actions">
                    <li><Link to="/themes" className="button" >
                      <span style={{ ...scale(1) }}> Get Started </span> </Link>
                    </li>
                </ul>
            </BgImage>
          </div>

      </div>
    </Layout>
  )

};

export default IndexPage;

// id: 6761
// This query is executed at build time by Gatsby.
// maxHeight: 1600
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
        fluid(maxWidth: 1024, maxHeight: 1374) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
