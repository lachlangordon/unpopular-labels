import { graphql, Link } from "gatsby"
import React from "react"
import { buildPath } from "../utils"
import dateformat from "dateformat"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ data }) => (
  <Layout>
    <SEO title="Page two" />
    <h1>My Gatsby Blog</h1>
    <p>
      <a href="https://www.gatsbyjs.org/packages/gatsby-source-graphql/">
        Using gatsby-source-graphql
      </a>
    </p>
    {data.maas.narratives.map((section, i) => (
        <h2>
          {section.title}
        </h2>
    ))}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage

export const query = graphql`
  query {
    maas {
      narratives (filter: { _ids: [6761, 6762, 6763, 6764] }) {
        _id
        title
        summary
        description
      }
    }
  }
`
