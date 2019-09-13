import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';

// import BgImage from '../components/Image/BgImage';
import SEO from '../components/seo';

class ThemesPage extends Component {

  render() {
    const { data, pageContext, location } = this.props;
    const { masterNarrativeId } = pageContext;

    const { bgImage } = data;
    const fluid = bgImage.childImageSharp.fluid;

    return (
      <Layout>
        <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />

        <main id="themes-page">
          <section id="one" >

            {data.sets.map((section, i) => {
              return (
                  <article key={`theme-item-${i}`}>
                    <Link to={"/set/" + section.id} className="link primary">
                      <Banner size="mobile" themeId={`${i + 1}`} />
                      <h3 className="major"> { section.name } </h3>
                    </Link>
                  </article>
              )
            })}

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
    bgImage: file(relativePath: { regex: "/before.png/" }) {
      id
      url
      sourceInstanceName
      publicURL
      name
      absolutePath
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
