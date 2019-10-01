import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

import { siteMeta } from '../queries/fragments';

const AboutPage = ({
  data: { site, masterSet, heroImage },
  location,
}) => {
  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <main className="about-page">

          <div className="container container--lg">
              <section className="content-header">
                <div className="about-page__masthead">
                  <Image size="thumbnail" imgObject={ heroImage } defImgMode="fluid" />
                </div>
              </section>

              <section className="main-content">
                  <div className="about-page__content">
                    <h1 className="guide-about-page__title">
                        { site.siteMetadata.title }
                    </h1>

                    { masterSet.description &&
                      <div className="set-page__description"
                         dangerouslySetInnerHTML={{ __html: masterSet.description }} />
                    }
                  </div>
              </section>
          </div>

      </main>
    </Layout>
  )

};

export default AboutPage;

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
      thumbnail: childImageSharp {
        fluid(maxHeight: 505) {
          ...GatsbyImageSharpFluid
        }
      }
      childImageSharp {
        fluid(maxWidth: 708, maxHeight: 1020, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
