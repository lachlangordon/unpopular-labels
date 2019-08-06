import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

import {handleBack, handleScrollToTop} from '../lib/navUtils';

import pic11 from '../assets/images/pic11.jpg'

 // Narrative
const SetPage = ({
  data: { set, objects },
  pageContext,
  location,
}) => {

  let paginationItems = [];

  for(let i = 1; i <= pageContext.numPages; i++) {
    paginationItems.push(<Link to={`/set/${pageContext.id}/${i > 1 ? i : ''}`}>{i}</Link>)
  }

  return (
    <Layout>
      <SEO title={set.name} keywords={[`gatsby`, `application`, `react`]} />
      <div id="main" className="alt">
        <section id="one">
            <div className="inner">
                <header className="major">
                    <h1> { set.name } </h1>
                </header>
                <span className="image main"><img src={pic11} alt="" /></span>

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
                        <Link to={'/object/' + object.id} className="link primary">
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
        <section id="three">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleScrollToTop}>Top</button>
          <div>
            {paginationItems}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default SetPage

export const pageQuery = graphql`
query SetPage( $id: String!, $skip: Int!, $limit: Int!) {
  set( id: { eq: $id } ) {
    id
    name
    summary
    description
  }
  
  objects: SetObjectsByParentId(parentId: $id, limit: $limit, skip: $skip) {
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
