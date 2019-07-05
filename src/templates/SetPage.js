import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

import pic11 from '../assets/images/pic11.jpg'

 // Narrative
const SetPage = ({
  data: { set },
  pageContext,
  location,
}) => {

  return (
    <Layout>
      <div id="main" className="alt">
          <section id="one">
              <div className="inner">
                  <header className="major">
                      <h1> { set.name } </h1>
                  </header>
                  <span className="image main"><img src={pic11} alt="" /></span>

                  <p> { set.summary }</p>
                  <p> { set.description }</p>
              </div>
          </section>
      </div>
    </Layout>
  )
}

export default SetPage

export const pageQuery = graphql`
query SetPage( $setId: String! ) {
  set( id: { eq: $setId } ) {
    id
    name
    summary
    description
  }
}
`
