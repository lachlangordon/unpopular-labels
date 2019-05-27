import React from 'react'
import { graphql } from 'gatsby'

// import { GatsbyNarrativePageQuery } from '../queries/ServerQuery'
import Layout from '../components/layout'
import Image from '../components/image'

import pic11 from '../assets/images/pic11.jpg'

 // Narrative
const Narrative = ({
  data: { narrative },
  pageContext,
  location,
}) => {

  return (
    <Layout>
      <div id="main" className="alt">
          <section id="one">
              <div className="inner">
                  <header className="major">
                      <h1> { narrative.name } </h1>
                  </header>
                  <span className="image main"><img src={pic11} alt="" /></span>

                  <p> { narrative.summary }</p>
                  <p> { narrative.description }</p>
              </div>
          </section>
      </div>
    </Layout>
  )
}
// ${GatsbyNarrativePageQuery}

export default Narrative

export const pageQuery = graphql`
query NarrativePage( $narrativeId: String! ) {
  narrative( id: { eq: $narrativeId } ) {
    id
    name
    summary
    description
  }
}
`
