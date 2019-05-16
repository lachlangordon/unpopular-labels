import React from "react"
import { Link } from "gatsby"
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'

function buildImgPath(i) {
  // let imgPic =  'pic0'.concat(++i);
  // console.log(imgPic)
  // return `url(${imgPic})`
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

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Helmet
        title="Gatsby Starter"
        meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
        ]}
    >
    </Helmet>
    <div id="main">
        <section id="one" className="tiles">
          {data.maas.narratives.map((section, i) => (
              <article key={i} style={{ backgroundImage: buildImgPath(i) }}>
                  <header className="major">
                      <h3> {section.title} </h3>
                      <p> {section.summary }</p>
                  </header>
                  <Link to="/landing" className="link primary"></Link>
              </article>
          ))}
        </section>
        <section id="two">
            <div className="inner">
                <header className="major">
                    <h2>Massa libero</h2>
                </header>
                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
                <ul className="actions">
                    <li><Link to="/page-2/" className="button next">Get Started</Link></li>
                </ul>
            </div>
        </section>
    </div>

  </Layout>
)

export default IndexPage


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
