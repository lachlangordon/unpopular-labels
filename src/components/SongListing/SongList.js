import React, { Component } from 'react';
import SongListing from "../SongListing/SongListing";
import {AlbumContext} from "../../providers/AlbumContext";

class SongList extends Component {

    handleClick = (album, i, context) => {
      context.setAlbum(album);
      context.setSong(i);
    }

    render() {
      console.log(this.props);
        return (
                <AlbumContext.Consumer>
                  {context => {
                      return (
                        <div className="album-listing">
                            {this.props.album.tracks.map((track, i) => {
                                return (
                                  <SongListing key={i} title={track.title} subtitle={track.description} onClick={() => this.handleClick(this.props.album, i, context)}/>
                                )
                            })}
                        </div>
                      )
                  }}
                </AlbumContext.Consumer>

        );
    }
}

export default SongList;