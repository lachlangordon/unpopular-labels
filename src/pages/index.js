import React from 'react'
import { graphql, Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import sip_backdrop from '../assets/images/sip_backdrop.jpg';

const IndexPage = ({
  data,
  pageContext: {
    masterNarrativeId,
  },
  location,
}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div id="main">
        <section id="one">
          <img src={sip_backdrop}/>
          <Link to="/themes">Start</Link>
        </section>
    </div>
  </Layout>
)

export default IndexPage

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
      tileImages
    }
  }
`
