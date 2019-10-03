import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import SEO from '../components/seo';

import withViewport from '../decorators/withViewport';

class ThemesPage extends Component {
  constructor(props) {
		super(props);
    this.state = { bannerSize: "desktop" }
	}

  // input = viewport size
  getBannerSize = ({ width, height }) => {
    let bannerSize;
    if (width < 767) { bannerSize = "mobile"; }
    else if (width > 767 && width < 1366) { bannerSize = "ipad"; }
    else if (width > 1366) { bannerSize = "desktop";  }
    else { bannerSize = "hi-res";  }
    return bannerSize;
  }

  render() {
    const { data, pageContext, location } = this.props;
    const { masterNarrativeId } = pageContext;
    console.log(this.props.viewport);

    let bannerSize = this.getBannerSize(this.props.viewport);
    return (
      <Layout location={location}>
        <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />

        <main id="themes-page">
          <section className="themes-page__body">

            <div className="container container--lg no-padding">
            { data.sets.map((section, i) => {
              return (
                  <article key={`theme-item-${i}`} className="banner-article">
                    <Link to={"/set/" + section.id} className="link primary">
                      <Banner size={ bannerSize } themeId={`${i + 1}`} />
                    </Link>
                    <h3 className="theme-item__title"> { section.name } </h3>
                  </article>
              )
            })}
            </div>

            {/* <button onClick={this.onClickHandler}> click </button> */}
          </section>
        </main>
      </Layout>
    )
  }
}

export default withViewport(ThemesPage);

// id: 6761
// fields: { slug: { eq: $slug } }
// https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
// This query is executed at build time by Gatsby.
export const pageQuery = graphql`
  query {
    sets: SetsByMasterId {
      id
      name
      summary
      description
    }
  }
`;
