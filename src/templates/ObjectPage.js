import React from 'react';
import { graphql, Link } from 'gatsby';

import ItemSwipe from '../components/ItemSwipe/ItemSwipe';
import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';
import IconLegend from "../components/IconLegend/IconLegend";
import LindaIcon from "../components/LindaIcon/LindaIcon";
import JennyIcon from "../components/JennyIcon/JennyIcon";
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";

import { saveSeenObject } from '../lib/session';
import { parseCirca } from '../lib/utils';

// assign class to Linda or Jenny quotes
const quotedClass = quote => {
  let className = 'other__quote';
  if ( quote.match(/^Linda Jackson/) ) { className = `linda__quote`; }
  else if ( quote.match(/^Jenny Kee/) ) { className = `jenny__quote`; }
  return className;
}

const getQuotePerson = quote => {
  return quote.substring(0, quote.indexOf('<p>'));
}

const getQuoteAttribution = quote => {
  return quote.substring(quote.indexOf('<p>'));
}

const ObjectPage = ({
  data: { images, object },
  pageContext,
  location,
}) => {

  if (!object.object) {
    return (<div>Not Web Published</div>);
  }

  let title = object.object.name;
  if (object.object.production[0] && object.object.production[0].date !== null) {
    title += `, ${ parseCirca(object.object.production[0].date) }`;
  }

  //Work out quote html
  let quoteClass = '';
  let glasses = undefined;
  if (object.notes4) {
    quoteClass = quotedClass(object.notes4);
    if (quoteClass === 'linda__quote') {
      glasses = <LindaIcon/>
    } else if (quoteClass === 'jenny__quote') {
      glasses = <JennyIcon/>
    }
  }

  let related = object.parent.setObjects.filter((otherObject) => otherObject.id != object.id);
  saveSeenObject(`${object.id}`);

  return (
    <Layout location={location}>
      <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />

      <div className="object-page">
          <div className="container container--lg no-padding">
            <section className="content-header">
                <div className="object-page__mainImg">
                  {
                    images.length && (
                      <Image className="image--object"
                             imgObject={ images[0].fields.localFile }
                             defImgMode="fluid"
                             />
                    )
                  }
                </div>
            </section>

            <section className="section main-content">
                <div className="object-page__content">
                    <h1 className="object-page__title">
                      { title }
                    </h1>

                    { object.notes2 &&
                      <p className="object-page__notes2"
                         dangerouslySetInnerHTML={{ __html: object.notes2 }} />
                    }

                    { object.object.acquisitionCreditLine &&
                      <p className="object-page__credit-line"
                         dangerouslySetInnerHTML={{ __html: object.object.acquisitionCreditLine }} />
                    }
                </div>
                <div className="object-page__bottom-content">
                    { object.notes3 &&
                        <div className="object-page__notes3"
                                    dangerouslySetInnerHTML={{ __html: object.notes3 }} />
                    }

                    { object.notes4 &&
                      <div className="object-page__notes4">
                        <span className={quoteClass} dangerouslySetInnerHTML={{ __html: `&mdash; ${getQuotePerson(object.notes4)}` }}/>
                        {glasses}
                        <div dangerouslySetInnerHTML={{ __html: getQuoteAttribution(object.notes4) }}/>
                      </div>
                    }


                </div>
            </section>
          </div>

          <hr />

          <div className="container container--lg no-padding">
            <section className="content-related" >
                { related.length &&
                  <div className="object-page__related-items">
                    <div>
                      <h2 className="object-page__related-items__title">Other objects in <Link to={`/set/${object.parent.id}`}>{object.parent.name}</Link> : </h2>
                      <div className="object-page__related-items__count">{`${related.length + 1} objects`}</div>
                      <div className="object-page__related-items__scroll">&larr; scroll</div>
                    </div>
                    <ItemSwipe className="object-page__related-slider" objectItems={related} />
                  </div>
                }
            </section>
            <section className="section">
              <div className="container container--lg">
                <NavigationButtons/>
              </div>
            </section>
            <section className="section">
              <div className="container container--lg">
                <IconLegend/>
              </div>
            </section>
          </div>

      </div>
    </Layout>
  )

}

export default ObjectPage;

// images[0] = main image
// parent = to find related items
export const pageQuery = graphql`
  query ObjectPage($id: String!) {
    object: setObject(id: { eq: $id }) {
      id
      notes2
      notes3
      notes4
      object {
        name
        production {
          date
        }
        isLoan
        significanceStatement
        acquisitionCreditLine
        mainImage {
          id
          url
          thumbnailURL
        }
      }
      parent {
        ... on Set {
          id
          name
          setObjects {
            id
            notes3
            object {
              displayTitle
              mainImage {
                id
                url
                thumbnailURL
              }
            }
          }
        }
      }
    }
    images: ImagesByParentId(parentId: $id) {
      id
      url
      thumbnailSrc
      serverCropSrc
      width
      height
      filename
      caption
      fields {
        localFile {
          ...default_GatsbyImageSharp
        }
      }
    }
  }
`;
