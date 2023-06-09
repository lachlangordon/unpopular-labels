import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Image from '../components/Image/Image';
import ImageByPath from '../components/Image/ImageByPath';
import SEO from '../components/seo';
import Banner from '../components/Banner/Banner';

import { saveSeenObject, isAudioMuted, saveAudioMuteState } from '../lib/session';
import {convertToSID, getBannerSize} from '../lib/utils';

import transcripts from "../lib/transcripts";

import withViewport from "../decorators/withViewport";
import SongList from "../components/SongListing/SongList";
import PlayPauseButton from "../components/AlbumPlayer/PlayPauseButton";
import {AlbumContext} from "../providers/AlbumContext";

class TrackPage extends Component {

  constructor(props) {
    super(props);
  }


  handleVolumeChange = (e) => {
    saveAudioMuteState(e.target.muted);
  }

  render() {

    const {
      data,
      location,
      viewport,
    } = this.props;

    const { object } = data;

    let bannerSize = getBannerSize(viewport);

    if (!object.object) {
      return (<div>Not Web Published</div>);
    }

    saveSeenObject(`${object.id}`);

    const isMuted = isAudioMuted();

    let transcript = null;
    if (transcripts.hasOwnProperty(object.id)) {
      transcript = transcripts[object.id];
    } else {
      transcript = object.notes3;
    }

    const imgCheck = object.object.mainImage.imagePath && object.object.mainImage.filename;

    return (
      <Layout location={location}>
        <SEO title={object.object.name} keywords={[`gatsby`, `application`, `react`]} />

        <div className="object-page">
          <div className="container container--lg no-padding">

            <section className="content-header object-page__mainImg">
              { imgCheck && (
                  <ImageByPath className="image--object"
                             path={object.object.mainImage.imagePath}
                             filename={object.object.mainImage.filename}
                      />
              )}
            </section>

            <section className="section main-content">

              <div className="object-page__content">
                <div className="object-page__title-container">
                  <AlbumContext.Consumer>
                    { context => (
                      <PlayPauseButton onClick={() => {context.setAlbum(object.object); context.setSong(0)}} playing={false}/>
                    )
                    }
                  </AlbumContext.Consumer>
                  <div>
                    <h1 className="object-page__title" dangerouslySetInnerHTML={{__html: object.object.name}}>
                    </h1>
                    <div className="object-page__subtitle" dangerouslySetInnerHTML={{__html: object.object.subtitle}}>
                    </div>
                  </div>

                </div>

                <SongList album={object.object}/>
                { transcript &&
                <div className="object-page__notes3"
                     dangerouslySetInnerHTML={{ __html: transcript }} />
                }
                <small className="object-page__notes4" dangerouslySetInnerHTML={{ __html: object.notes4 }} />
              </div>
              <div className="object-page__bottom-content">

              </div>
            </section>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withViewport(TrackPage);

// images[0] = main image
// parent = to find related items
export const pageQuery = graphql`
  query TrackPage($id: String!) {
    object: setObject(id: { eq: $id }) {
      id
      notes2
      notes3
      notes4
      object {
        name
        subtitle
        mainImage {
          id
          url
          thumbnailURL
          imagePath
          filename
        }
        tracks {
          title
          description
          url
        }
      }
    }
  }
`;
