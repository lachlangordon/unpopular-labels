import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import SEO from '../components/seo';

class ThemesPage extends Component {
  constructor(props) {
		super(props);
    this.state = { bannerSize: "hi-res" }
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

  getViewportSize = (viewport) => {
   // console.log('Here is the updated viewport value: ');
   console.log(viewport);
   return viewport;
   // this.getBannerSize(viewport);
  }

  // onClickHandler = (test) => {
  //   let viewport = this.getViewportSize;
  //   console.log(viewport)
  //   console.log( this.getBannerSize(viewport) );
  //   this.setState({ bannerSize: this.getBannerSize(viewport) });
  // }

  render() {
    const { data, pageContext, location } = this.props;
    const { masterNarrativeId } = pageContext;

    // const currentSize = this.getBannerSize(  );
    // console.log(currentSize)
    //
    // returnViewportSize={ this.getViewportSize }
    return (
      <Layout >
        <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />

        <main id="themes-page">
          <section className="themes-page__body">

            <div className="container container--lg no-padding">
            { data.sets.map((section, i) => {
              return (
                  <article key={`theme-item-${i}`} className="banner-article">
                    <Link to={"/set/" + section.id} className="link primary">
                      <Banner size={ this.state.bannerSize } themeId={`${i + 1}`} />
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

export default ThemesPage;

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
