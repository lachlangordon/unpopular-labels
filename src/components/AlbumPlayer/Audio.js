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
    if (this.player.current && !this.player.current.paused) {
      const currentElapsed = getTimeString(this.player.current.currentTime);
      if (this.state.elapsedString !== currentElapsed) {
        this.setState({
          elapsed: Math.floor(this.player.current.currentTime),
          elapsedString: currentElapsed
        });
      }
      this.raf = requestAnimationFrame(this.updateSeekerWhilePlaying);
    }
  }

  changeSong = (playOnLoad = false) => {
    this.setState({
      playing: playOnLoad,
      elapsed: 0,
      elapsedString: '0:00'
    }, () => {
      if (playOnLoad) {
        this.player.current.play();
        requestAnimationFrame(this.updateSeekerWhilePlaying);
      }
    });
  };

  render() {
    if (!this.props.src) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="controls-container">
          <button onClick={() => this.props.previousSong(this.changeSong)}><span className="sr-only">Previous</span></button>
          <button onClick={this.playPauseSong}>{this.state.playing ? (
            <span className="sr-only">Pause</span>
          ): (
            <span className="sr-only">Play</span>
            )}</button>
          <button onClick={() => this.props.nextSong(this.changeSong)}><span className="sr-only">Next</span></button>
        </div>
        <div className="seeker-container">
          <span className="elapsed">
            {this.state.elapsedString}
          </span>
          <input type="range" max={this.state.duration} value={this.state.elapsed} onInput={this.moveSeeker} onChange={this.changeSeeker}/>
          <span className="duration">
            {this.state.durationString}
          </span>
        </div>

        <audio ref={this.player} src={this.props.src} onEnded={() => this.props.nextSong(this.changeSong)} onLoadedMetadata={this.setDuration}>
          Your browser does not support HTML audio.
        </audio>
      </React.Fragment>

    )
  }
}

export default Audio;