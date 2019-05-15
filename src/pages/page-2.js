import { graphql, Link } from "gatsby"
import React from "react"
import { makeBlogPath } from "../utils"
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
    {data.cms.blogPosts.map((blog, i) => (
      <Link key={i} to={makeBlogPath(blog)}>
        <h2>
          {dateformat(blog.createdAt, `fullDate`)} - {blog.title}
        </h2>
      </Link>
    ))}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage

export const query = graphql`
  query {
    cms {
      blogPosts(where: { status: PUBLISHED }, orderBy: createdAt_DESC) {
        title
        createdAt
        slug
      }
    }
  }
`
