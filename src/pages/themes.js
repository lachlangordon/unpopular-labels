import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
// import Loader from '../components/Loader/Loader';
import SEO from '../components/seo';


class ThemesPage extends Component {

  render() {
    const { data, pageContext, location } = this.props;
    const { masterNarrativeId } = pageContext;

    return (
      <Layout>
        <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />

        <div id="main">
          <section id="one" >
            {data.sets.map((section, i) => {
              return (
                  <article key={i}>
                    <Link to={"/set/" + section.id} className="link primary">
                    <header className="major">
                      <h3> { section.name } </h3>
                    </header>
                    </Link>
                  </article>
              )
            })}
          </section>
        </div>
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
