import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

import { siteMeta } from '../queries/fragments';

const IndexPage = ({
  data: { site, masterSet, heroImage },
  location,
}) => {

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <main className="about-page">

          <div className="container container--lg no-padding">

            <div className="about-page__masthead">
              <Image imgObject={ heroImage } defImgMode="fluid" />
            </div>

            <div className="about-page__content">
              <h1 className="guide-index-page__title">
                  { site.siteMetadata.title }
              </h1>

              { masterSet.description &&
                <div className="set-page__description"
                   dangerouslySetInnerHTML={{ __html: masterSet.description }} />
              }
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
      ...siteMeta
    }
    masterSet: getMasterSet {
      id
      name
      summary
      description
    }
    heroImage: file(relativePath: { regex: "/SIP_JENNY_LINDA.jpg/" }) {
      id
      url
      sourceInstanceName
      publicURL
      name
      absolutePath
      childImageSharp {
        fluid(maxWidth: 2124) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
