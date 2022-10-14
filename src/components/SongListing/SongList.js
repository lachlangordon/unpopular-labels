import React, { Component } from 'react';
import SongListing from "../SongListing/SongListing";
import {AlbumContext} from "../../providers/AlbumContext";

class SongList extends Component {

    handleClick = (album, i, context) => {
      context.setAlbum(album);
      context.setSong(i);
    }

    render() {
        return (
                <AlbumContext.Consumer>
                    {context => {
                        return (
                            <div className="album-listing">
                                {this.props.album.tracks.map((track, i) => {
                                    const currentlyPlaying = context.currentAlbum && context.currentAlbum.id === this.props.album.id && context.currentSong === i;
                                    return (
                                      <SongListing key={i} track={i+1} title={track.title} active={currentlyPlaying} subtitle={track.description} onClick={() => this.handleClick(this.props.album, i, context)}/>
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