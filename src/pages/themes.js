import React from 'react'
import { graphql, Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import {handleBack, handleScrollToTop} from "../lib/navUtils";

const themesPage = ({
                     data,
                     pageContext: {
                       masterNarrativeId,
                     },
                     location,
                   }) => (
  <Layout>
    <SEO title="Themes" keywords={[`gatsby`, `application`, `react`]} />
    <div id="main">
      <section id="one" className="tiles">
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
      <section id="two">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleScrollToTop}>Top</button>
      </section>
    </div>
  </Layout>
);

export default themesPage

// _id: 6761
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
`
