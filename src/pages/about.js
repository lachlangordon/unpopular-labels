import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';

import { siteMeta } from '../queries/fragments';
import withViewport from '../decorators/withViewport';

const aboutImgSize = ({ width, height }) => {
  if (width < 1366) {
    return true;
  } else {
    return false;
  }
}

class AboutPage extends Component {
  render() {
    const { location, data } = this.props;
    const { site, masterSet, heroImage } = data;

    return (
      <Layout location={location}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="about-page">

            <div className="container container--lg">
                <section className="content-header">
                  <div className="about-page__masthead">
                    <Image isThumb={ aboutImgSize(this.props.viewport) } imgObject={ heroImage } defImgMode="fluid" />
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

        </div>
      </Layout>
    );
  }
}

export default withViewport(AboutPage);

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
