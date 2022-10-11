import React, {Component} from 'react';
import { AlbumContext} from "../../providers/AlbumContext";
import Audio from "./Audio";

class AlbumPlayer extends Component {

    static contextType = AlbumContext;
    constructor(props) {
        super(props);
    }

    render() {

        const title = this.context.currentAlbum && this.context.currentAlbum.songs[this.context.currentSong].title || null;
        const src = this.context.currentAlbum && this.context.currentAlbum.songs[this.context.currentSong].src || null;
        return (
              <div className="audio-container">
                  {title}
                  <Audio src={src}/>
              </div>
        )
    }
}

export default AlbumPlayer;