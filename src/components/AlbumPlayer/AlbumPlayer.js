import React, {Component} from 'react';
import { AlbumContext} from "../../providers/AlbumContext";
import Audio from "./Audio";

class AlbumPlayer extends Component {

    static contextType = AlbumContext;
    constructor(props) {
        super(props);
    }

    previousSong = (callback) => {
        const { currentSong, setSong } = this.context;
        const newSong = currentSong - 1;
        if (newSong >= 0) {
            setSong(newSong);
            callback(true);
        }
    };

    nextSong = (callback) => {
        const { currentAlbum, currentSong, setSong } = this.context;
        const newSong = currentSong + 1;
        if (currentAlbum.object.tracks[newSong] === undefined) {
            setSong(0);
            callback(false);
        } else {
            setSong(newSong);
            callback(true);
        }
    };

    render() {

        const artist = this.context.currentAlbum && this.context.currentAlbum.notes2 || null;
        const title = this.context.currentAlbum && this.context.currentAlbum.object.tracks[this.context.currentSong].title || null;
        const src = this.context.currentAlbum && this.context.currentAlbum.object.tracks[this.context.currentSong].url || null;
        return (
              <div className="audio-container">
                  <Audio src={src} previousSong={this.previousSong} nextSong={this.nextSong} title={title} artist={artist}/>
              </div>
        )
    }
}

export default AlbumPlayer;