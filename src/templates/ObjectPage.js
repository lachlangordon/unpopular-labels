import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import ItemSwipe from '../components/ItemSwipe/ItemSwipe';
import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";
import Banner from '../components/Banner/Banner';
import { isEmpty } from 'lodash';

import { saveSeenObject } from '../lib/session';
import {convertToSID, parseCirca, getBannerSize} from '../lib/utils';

import LindaIcon from "../components/Icons/LindaIcon";
import JennyIcon from "../components/Icons/JennyIcon";
import withViewport from "../decorators/withViewport";

// assign class to Linda or Jenny quotes
const quotedClass = quote => {
  let className = 'other__quote';
  if ( quote.match(/^Linda Jackson/) ) { className = `linda__quote`; }
  else if ( quote.match(/^Jenny Kee/) ) { className = `jenny__quote`; }
  return className;
};

const getQuotePerson = quote => {
  if (quote.indexOf('<p>') === -1) {
    return quote;
  }
  return quote.substring(0, quote.indexOf('<p>'));
};

const getQuoteAttribution = quote => {
  if (quote.indexOf('<p>') === -1) {
    return '';
  }
  return quote.substring(quote.indexOf('<p>'));
};

class ObjectPage extends Component {

  constructor(props) {
    super(props);
    this.related = [];
    this.init();
  }

  init = () => {
    // let object = props.data.object;
    const { object } = this.props.data;

    let objectIndex = -1;
    for (let i = 0; i < object.parent.setObjects.length; i++) {
      if (`${ object.parent.setObjects[i].id }` === object.id) {
        objectIndex = i;
        break;
      }
    }

    this.related = object.parent.setObjects;
    if (objectIndex > 0) {
      let removedObjects = this.related.splice(objectIndex);
      this.related = removedObjects.concat(this.related);
    }
    this.related.splice(0, 1);
  }

  render() {

    const {
      data,
      location,
      viewport,
    } = this.props;

    // console.log(this.related);

    const { images, object } = data;

    let bannerSize = getBannerSize(viewport);

    if (!object.object) {
      return (<div>Not Web Published</div>);
    }

    let title = object.object.name;
    let date = undefined;
    if (object.object.production[0] && object.object.production[0].date !== null) {
      date = (<span className="object-page__date">{`, ${parseCirca(object.object.production[0].date)}` }</span>);
    }

    // creditLine
    let creditLine = '';
    const { acquisitionCreditLine, recordType } = object.object;
    if ( acquisitionCreditLine.length === 1 &&
      (recordType === "ArchivePart" || recordType === "Part") ) {
      creditLine = "<span> MAAS Collection </span>";
    } else {
      creditLine = acquisitionCreditLine;
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

    saveSeenObject(`${object.id}`);
    console.log("quote person", getQuotePerson(object.notes4));
    console.log("quote att", getQuoteAttribution(object.notes4));

    return (
      <Layout location={location}>
        <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />

        <div className="object-page">
          <div className="container container--lg no-padding">

            <section>
              { object.parent.id && (
                <Banner className="no-padding" type="ribbon" size={bannerSize} themeId={ convertToSID(object.parent.id) } />
              )
              }
            </section>

            <section className="content-header object-page__mainImg">
              {
                !!images.length && (
                  <Image className="image--object"
                         imgObject={ images[0].fields.localFile }
                         defImgMode="fluid"
                  />
                )
              }
            </section>

            <section className="section main-content">

              <div className="object-page__content">
                <h1 className="object-page__title">
                  { title }
                  { date }
                </h1>

                { object.notes2 &&
                <p className="object-page__notes2"
                   dangerouslySetInnerHTML={{ __html: object.notes2 }} />
                }

                { creditLine &&
                <p className="object-page__credit-line"
                   dangerouslySetInnerHTML={{ __html: creditLine }} />
                }
              </div>
              <div className="object-page__bottom-content">
                { object.notes3 &&
                <div className="object-page__notes3"
                     dangerouslySetInnerHTML={{ __html: object.notes3 }} />
                }

                { object.notes4 &&
                <div className="object-page__notes4">
                  <span className={quoteClass}>
                    <span className="quote-person" dangerouslySetInnerHTML={{ __html: `&mdash; ${getQuotePerson(object.notes4)}` }}/>{glasses}
                  </span>
                  <span className="quote-attribution" dangerouslySetInnerHTML={{ __html: getQuoteAttribution(object.notes4) }}/>
                </div>
                }


              </div>
            </section>
          </div>

          <hr />

            <section className="content-related container container--lg no-padding" >
              { this.related.length &&
              <div className="object-page__related-items">
                  <h3 className="object-page__related-items__title">Other objects in <Link to={`/set/${object.parent.id}`}>{object.parent.name}</Link> : </h3>
                  <div className="object-page__related-items__count">{`${this.related.length} ${this.related.length > 1 ? "objects" : "object"}`}</div>
                  {/* <div className="object-page__related-items__scroll">&larr; scroll</div> */}
                <ItemSwipe className="object-page__related-slider" objectItems={this.related}/>
              </div>
              }
            </section>
            <section className="section">
              <NavigationButtons/>
            </section>

        </div>
      </Layout>
    )
  }
}

export default withViewport(ObjectPage);

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
        recordType
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
