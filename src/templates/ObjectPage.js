import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import SEO from '../components/seo';
import Banner from '../components/Banner/Banner';

import {convertToSID, getBannerSize} from '../lib/utils';

import transcripts from "../lib/transcripts";

import withViewport from "../decorators/withViewport";
import SongList from "../components/SongListing/SongList";

class ObjectPage extends Component {

  constructor(props) {
    super(props);
    this.related = [];
    this.init();
  }

  init = () => {
    const { object } = this.props.data;

    if (object.parent.setObjects.length > 1) {
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
    } else {
       this.related = object.parent.setObjects;
    }
  }

  render() {

    const album = {
      title: "Robert Rosen: Glitterati",
      subtitle: "Podcast, 2021",
      attribution: "Recorded somewhere in the Powerhouse Museum by someone who works here",
      licensing: "Licensed by PHM",
      songs: [
        {
          title: "Paul and Linda McCartney, Abbey Road Studios",
          src: "https://maas-podcasts.s3.ap-southeast-2.amazonaws.com/glitterati/01.+S1+-+Paul+and+Linda+McCartney%2C+Abbey+Road+Studios.mp3"
        },
        {
          title: "Richard & Jane O'Brien at the Embassy Club",
          src: "https://maas-podcasts.s3.ap-southeast-2.amazonaws.com/glitterati/02.+S8+-+Richard+%26+Jane+O'Brien+at+the+Embassy+Club.mp3"
        },
        {
          title: "Lynne Franks",
          src: "https://maas-podcasts.s3.ap-southeast-2.amazonaws.com/glitterati/03.+S2+-+Lynne+Franks.mp3"
        },
        {
          title: "Zandra Rhodes",
          src: "https://maas-podcasts.s3.ap-southeast-2.amazonaws.com/glitterati/04.+S2+-+Zandra+Rhodes.mp3"
        },
        {
          title: "Anna Piaggi",
          src: "https://maas-podcasts.s3.ap-southeast-2.amazonaws.com/glitterati/05.+S3+Anna+Piaggi.mp3"
        },
      ]
    }

    const {
      data,
      location,
      viewport,
    } = this.props;

    const { images, object } = data;

    let bannerSize = getBannerSize(viewport);

    if (!object.object) {
      return (<div>Not Web Published</div>);
    }

    let transcript = null;
    if (transcripts.hasOwnProperty(object.id)) {
      transcript = transcripts[object.id];
    } else {
      transcript = object.notes3;
    }

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
                <h1 className="object-page__title" dangerouslySetInnerHTML={{__html: object.notes2}}>
                </h1>
              </div>
              <div className="object-page__bottom-content">
                { transcript &&
                <div className="object-page__notes3"
                     dangerouslySetInnerHTML={{ __html: transcript }} />
                }
              </div>

              <SongList album={album}/>
            </section>
          </div>

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
