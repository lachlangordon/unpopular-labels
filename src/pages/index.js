import React from 'react';
import { graphql, Link } from 'gatsby';
import { scale } from '../lib/typography';
import { isEmpty } from 'lodash';

import Layout from '../components/Layout/Layout';
import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

import withViewport from '../decorators/withViewport';
import { imgClassOrient, getBannerSize } from '../lib/utils';

const IndexPage = ({
  data: { site, heroImage },
  viewport,
  location,
}) => {

  // calculate various classes: scroll or no-scroll
  let imgOrient = imgClassOrient(viewport), viewportSize = getBannerSize(viewport);
  let getBodyClass = '', getImageClass = `bg-image ${imgOrient}-${viewportSize}`;

  if ( imgOrient === 'portrait' ) {
    getBodyClass = 'no-scroll';
    if ( viewportSize === 'mobile' ) {
      getBodyClass = 'no-scroll-mobile';
    }
  } else {
    getBodyClass = '';
  }

  // imgProps
  let imgProp = {
    height: !isEmpty(viewport['height']) ? viewport['height'] : 100,
    isMobile: viewportSize === 'mobile' ? true : false,
    className: getImageClass,
    imgObject: heroImage,
  }

  return (
    <Layout location={location}>
      <SEO title="Home" bodyClassName={ getBodyClass } keywords={[`gatsby`, `application`, `react`]} />
      <div className="index-page">
          <div className="container container--lg no-padding">
            <BgImage { ...imgProp }>
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

export default withViewport(IndexPage);

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
      thumbnail: childImageSharp {
        fluid(maxWidth: 420,maxHeight: 720) {
          ...GatsbyImageSharpFluid
        }
      }
      childImageSharp {
        fluid(maxWidth: 1024, maxHeight: 1374) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
