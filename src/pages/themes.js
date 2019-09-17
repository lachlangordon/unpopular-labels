import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import SEO from '../components/seo';

class ThemesPage extends Component {

  render() {
    const { data, pageContext, location } = this.props;
    const { masterNarrativeId } = pageContext;

    return (
      <Layout>
        <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />

        <main id="themes-page">
          <section className="themes-page__body">

            {data.sets.map((section, i) => {
              return (
                  <article key={`theme-item-${i}`}>
                    <Link to={"/set/" + section.id} className="link primary">
                      <Banner size="hi-res" themeId={`${i + 1}`} />
                    </Link>
                    <h3 className="theme-item__title"> { section.name } </h3>
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
  }
`;
