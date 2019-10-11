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
                  <span className="about-page__img-caption"> Linda Jackson and Jenny Kee, Image: Hugh Stewart </span>
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
            <div className="container container--lg">
              <section className="cultural-statement">
                <p>We have been incredibly privileged to live such creative lives.</p>
                <p>We have searched for – and been inspired by – the best in the living world.</p>
                <p>To all First Nations Peoples across this sacred Earth, we acknowledge your cultures, your ideas and your beliefs.</p>
                <p>Our reckless love and unbridled passion for all that constitutes the diversity of the civilised world, together with the mesmerising beauty of the natural world, provided great stimulus for our individual but seemingly connected design aesthetic.</p>
                <p>We make our work to celebrate and to explain our response to a rich and diverse Australia – an Australia of our times. That response is still being shaped and enhanced by a deeper understanding of what place really means to a people, and with greater perspective and shared understanding of protocol and propriety.</p>
                <p>While developing our colourful and exuberant picture of Australia, we must acknowledge in our country a period of great cultural naivety, societal ignorance and colonial blindness that only now we – as a society – are starting to address, enabling a pathway to true recognition, respect and reconciliation.</p>
                <p>To Indigenous Australia, we thank you for your custodianship, your creativity, your ingenuity and your generosity. You have inspired us in our work and in our lives.</p>
                <p>Jenny Kee and Linda Jackson</p>
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
