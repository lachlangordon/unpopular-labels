import React, { Component } from 'react';
import {AlbumContext} from "./AlbumContext";
import AlbumPlayer from "../components/AlbumPlayer/AlbumPlayer";

class AlbumProvider extends Component {
  setAlbum = (album) => {
    this.setState({currentAlbum: album});
  }

  setSong = (song) => {
    this.setState({currentSong: song});
  }

  state = {
    currentAlbum: null,
    setAlbum: this.setAlbum,
    currentSong: 0,
    setSong: this.setSong
  };

  render() {
    return (
      <AlbumContext.Provider value={this.state}>
          {this.props.children}
          <AlbumPlayer/>
      </AlbumContext.Provider>
    )
  }
}

export default ({element}) => (
  <AlbumProvider>
      {element}
  </AlbumProvider>
);