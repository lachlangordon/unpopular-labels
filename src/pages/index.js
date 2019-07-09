import React from 'react'
import { graphql, Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'

function buildImgPath(i) {
  switch(i) {
    case 0:
      return `url(${pic01})`
    case 1:
      return `url(${pic02})`
    case 2:
      return `url(${pic03})`
    case 3:
      return `url(${pic04})`
  }
}

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
        <section id="one" className="tiles">
        {data.sets.map((section, i) => {
          return (
            <article key={i} style={{ backgroundImage: buildImgPath(i) }}>
                <header className="major">
                    <h3> { section.name } </h3>
                    <p> {section.summary } </p>
                </header>
                <Link to="/landing" className="link primary"></Link>
            </article>
          )
        })}
        </section>

        {/* <!-- client side query --> */}
        <Query query={APOLLO_QUERY}>
          {({ data, loading, error }) => {
              if (loading) return <span> Loading... </span>
              if (error) return <span> Error: { error.message } </span>

              const { site } = data
              return (
                <section id="two">
                    <div className="inner">
                        <header className="major">
                            <h2> { site.siteMetadata.title } </h2>
                        </header>
                        <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
                        <ul className="actions">
                            <li><Link to="/page-2/" className="button next">Get Started</Link></li>
                        </ul>
                    </div>
                </section>
              )
          }}
        </Query>

    </div>
  </Layout>
)

export default IndexPage

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
query {
  site {
    siteMetadata {
      title
    }
  }
}`

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
