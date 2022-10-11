import React from "react";

export const AlbumContext = React.createContext({
  currentAlbum: null,
  currentSong: 0,
  setAlbum: () => {},
  setSong: () => {}
});