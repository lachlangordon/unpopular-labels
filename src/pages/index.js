import React from 'react';
import { graphql, Link } from 'gatsby';
import { scale, rhythm } from '../lib/typography';

import Layout from '../components/Layout/Layout';
import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

import withViewport from '../decorators/withViewport';
import { getImgOrient, getBannerSize } from '../lib/utils';
import { ArrowRight } from '../components/Icons/SharedIcons';

const IndexPage = ({
  data: { site, heroImage },
  viewport,
  location,
}) => {

  // calculate various classes: scroll or no-scroll
  let imgOrient = getImgOrient(viewport), viewportSize = getBannerSize(viewport);
  let getImageClass = `bg-image ${imgOrient}-${viewportSize}`;

  // imgProps
  let imgProp = {
    height: viewport['height'],
    isMobile: viewportSize === 'mobile' ? true : false,
    className: getImageClass,
    imgObject: heroImage,
  }

  let textStyle = (
     viewportSize === 'mobile' ) ? {
    ...scale(2.1),
    lineHeight: rhythm(3)
  } : {
    ...scale(2.5),
    lineHeight: rhythm(4.5)
  }

  // handle mobile & landscape mobile
  if (imgOrient === 'landscape' && viewport['height'] < 768) {
    textStyle = {
        ...scale(1.8),
       lineHeight: rhythm(2.5),
    }
  }

  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="index-page">
          <Link to="/themes" className="container container--lg no-padding">
            <BgImage { ...imgProp }>

                <div className="bg-content__wrapper">
                  <h2 className="guide-index-page__title"
                      style={ textStyle }>
                    <span className="text__fadeIn"> STEP INTO </span>
                    <span className="text__fadeIn"> PARADISE </span>
                  </h2>
                </div>
            </BgImage>
          </Link>

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
        fluid(maxWidth: 300,maxHeight: 720) {
          ...GatsbyImageSharpFluid
        }
      }
      childImageSharp {
        fluid(maxWidth: 768, maxHeight: 1774) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
