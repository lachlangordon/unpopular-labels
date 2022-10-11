import React, {Component} from 'react';
import {getTimeString} from "../../lib/player";

class Audio extends Component {

  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.state = {
      playing: false,
      duration: 0,
      elapsed: 0,
      durationString: '-:--',
      elapsedString: '-:--'
    }

    this.raf = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.src !== this.props.src) {
      this.changeSong(true);
    }
  }

  setDuration = () => {
    this.setState({
      duration: Math.floor(this.player.current.duration),
      durationString: getTimeString(this.player.current.duration)
    });
  };

  playPauseSong = () => {
    if (this.player.current.paused) {
      this.setState({
        playing: true
      }, () => {
        this.player.current.play();
        requestAnimationFrame(this.updateSeekerWhilePlaying);
      });
    } else {
      this.setState({
        playing: false
      }, () => {
        this.player.current.pause();
        cancelAnimationFrame(this.raf);
      });
    }
  }

  moveSeeker = (e) => {
    this.setState({
      elapsed: Math.floor(e.target.value),
      elapsedString: getTimeString(e.target.value)
    })
    if (!this.player.current.paused) {
      cancelAnimationFrame(this.raf);
    }
  };

  changeSeeker = (e) => {
    this.player.current.currentTime = e.target.value;
    if (!this.player.current.paused) {
      requestAnimationFrame(this.updateSeekerWhilePlaying);
    }
  }

  updateSeekerWhilePlaying = () => {
    if (this.player.current) {
      this.setState({
        elapsed: Math.floor(this.player.current.currentTime),
        elapsedString: getTimeString(this.player.current.currentTime)
      });
      this.raf = requestAnimationFrame(this.updateSeekerWhilePlaying);
    }
  }

  previousSong = () => {
    const { currentSong, setSong } = this.context;
    const newSong = currentSong - 1;
    if (newSong >= 0) {
      setSong(newSong);
      this.changeSong(true);
    }
  };

  nextSong = () => {
    const { currentAlbum, currentSong, setSong } = this.context;
    const newSong = currentSong + 1;
    if (currentAlbum.songs[newSong] === undefined) {
      setSong(0);
      this.changeSong();
    } else {
      setSong(newSong);
      this.changeSong(true);
    }
  };

  changeSong = (playOnLoad = false) => {
    this.setState({
      playing: playOnLoad,
      elapsed: 0,
      elapsedString: '0:00'
    }, () => {
      this.player.current.load();
      if (playOnLoad) {
        this.player.current.play();
        requestAnimationFrame(this.updateSeekerWhilePlaying);
      }
    });
  };

  render() {
    console.log(this.props.src);

    if (!this.props.src) {
      return null;
    }

    return (
      <React.Fragment>
        <button disabled={this.context.currentSong-1 < 0} onClick={this.previousSong}>Previous</button>
        <button onClick={this.playPauseSong}>{this.state.playing ? 'Pause': 'Play'}</button>
        <button onClick={this.nextSong}>Next</button>
        <div className="elapsed">
          {this.state.elapsedString}
        </div>
        <input type="range" max={this.state.duration} value={this.state.elapsed} onInput={this.moveSeeker} onChange={this.changeSeeker}/>
        <div className="duration">
          {this.state.durationString}
        </div>
        <audio ref={this.player} src={this.props.src} onEnded={this.props.nextSong} onLoadedMetadata={this.setDuration}>
          Your browser does not support HTML audio.
        </audio>
      </React.Fragment>

    )
  }
}

export default Audio;