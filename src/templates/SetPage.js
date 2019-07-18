import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

import pic11 from '../assets/images/pic11.jpg'

 // Narrative
const SetPage = ({
  data: { set, objects },
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
          <section id="two" className="tiles">
            {
              objects.map((object, i) => {
                return (
                  <article key={i}>
                    {
                      object.object
                        ? (
                          <Link to={'/object/' + object.id}>
                            {
                              object.object.mainImage ? (
                                <img src={object.object.mainImage.url}/>
                              ) : <div>{object.object.name}</div>
                            }
                          </Link>
                        )
                        : (
                          <div>{"Unpublished object IRN " + object.id}</div>
                        )
                    }
                  </article>
                )
              })
            }
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
  
  objects: SetObjectsByParentId(parentId: $setId) {
    id
    object {
      name
      mainImage {
        url
      }
    }
  }
}
`
