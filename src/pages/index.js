import React from 'react';
import { graphql, Link } from 'gatsby';
import { scale, rhythm } from '../lib/typography';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';

import withViewport from '../decorators/withViewport';
import { getImgOrient, getBannerSize } from '../lib/utils';

// import logo from '../assets/images/glitterati-logo.svg';

const IndexPage = ({
  data: { site },
  viewport,
  location,
}) => {

  // calculate various classes: scroll or no-scroll
  let imgOrient = getImgOrient(viewport), viewportSize = getBannerSize(viewport);

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

  if (viewport['height'] === null) {
    return null;
  }

  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="index-page">
          <h1>{site.siteMetadata.shortTitle}</h1>
          <Link to="/tracks" className="container container--lg no-padding">
              <h3>Audio tracks</h3>
          </Link>
      </div>
    </Layout>
  );

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
  }
`;
