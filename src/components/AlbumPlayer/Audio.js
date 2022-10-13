import React, {Component} from 'react';
import {getTimeString} from "../../lib/player";
import {Next, Play, Pause, Previous} from "./Icons";

class Audio extends Component {

  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.seeker = React.createRef();

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
    console.log(prevState, this.state);
    if (prevProps.src !== this.props.src && this.state.playing === prevState.playing) {
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

  updateSeekerBar = () => {
    if (this.seeker.current) {
      const seekerWidth = this.seeker.current.value / this.seeker.current.max * 100 + '%';
      this.seeker.current.style.setProperty('--seeker-width', seekerWidth);
    }
  }

  moveSeeker = (e) => {
    this.setState({
      elapsed: Math.floor(e.target.value),
      elapsedString: getTimeString(e.target.value)
    }, this.updateSeekerBar)
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
        }, this.updateSeekerBar);
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
      this.updateSeekerBar();
      if (playOnLoad) {
        this.player.current.play();
        requestAnimationFrame(this.updateSeekerWhilePlaying);
      } else {
        this.player.current.load();
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

          <button className="play-pause" onClick={this.playPauseSong}>{this.state.playing ? (
            <span>
              <span className="sr-only">Pause</span>
              <Pause/>
            </span>
          ): (
            <span>
              <span className="sr-only">Play</span>
              <Play/>
            </span>
          )}</button>

          <div className="previous-next-container">
            <button className="previous" onClick={() => this.props.previousSong(this.changeSong)}>
            <span className="sr-only">
              Previous
            </span>
              <Previous/>
            </button>
            <button className="next" onClick={() => this.props.nextSong(this.changeSong)}>
              <span className="sr-only">Next</span>
              <Next/>
            </button>
          </div>

        </div>
        <div className="seeker-container">
          <span className="elapsed">
            {this.state.elapsedString}
          </span>
          <div className="title-container">
            <span>
              {this.props.artist}
            </span>
            <span>
              {this.props.title}
            </span>
          </div>
          <span className="duration">
            {this.state.durationString}
          </span>
          <input ref={this.seeker} type="range" max={this.state.duration} value={this.state.elapsed} onInput={this.moveSeeker} onChange={this.changeSeeker}/>
        </div>
        <audio ref={this.player} src={this.props.src} onEnded={() => this.props.nextSong(this.changeSong)} onLoadedMetadata={this.setDuration}>
          Your browser does not support HTML audio.
        </audio>
      </React.Fragment>

    )
  }
}

export default Audio;