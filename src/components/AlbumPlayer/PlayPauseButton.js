import React from "react";
import pauseIcon from "../../assets/maas-scss/svg/player/pause.svg";
import playIcon from "../../assets/maas-scss/svg/player/play.svg";

export default (props) => (
  <button className="play-pause" onClick={props.onClick}>{props.playing ? (
  <span>
    <span className="sr-only">Pause</span>
      <img className="pause" src={pauseIcon}/>
    </span>
): (
  <span>
              <span className="sr-only">Play</span>
              <img className="play" src={playIcon}/>
            </span>
)}</button>
)