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
        if (currentAlbum.songs[newSong] === undefined) {
            setSong(0);
            callback();
        } else {
            setSong(newSong);
            callback(true);
        }
    };

    render() {

        const title = this.context.currentAlbum && this.context.currentAlbum.songs[this.context.currentSong].title || null;
        const src = this.context.currentAlbum && this.context.currentAlbum.songs[this.context.currentSong].src || null;
        return (
              <div className="audio-container">
                  {title}
                  <Audio src={src} previousSong={this.previousSong} nextSong={this.nextSong}/>
              </div>
        )
    }
}

export default AlbumPlayer;