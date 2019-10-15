import React, { Component } from 'react';
import {handleBack, handleScrollToTop} from "../../lib/navUtils";

class NavigationButtons extends Component {
  render() {
    return (
      <div className="navigation-buttons">
        <button className="navigation-buttons__back" onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.52" height="20" viewBox="0 0 20.52 20">
            <path id="Font_Awesome_5_solid_arrow-left" d="M11.8,1.34,10.779.323a1.1,1.1,0,0,0-1.553,0l-8.9,8.9a1.1,1.1,0,0,0,0,1.553l8.9,8.9a1.1,1.1,0,0,0,1.553,0L11.8,18.66a1.1,1.1,0,0,0-.018-1.571L6.258,11.832H19.421a1.1,1.1,0,0,0,1.1-1.1V9.267a1.1,1.1,0,0,0-1.1-1.1H6.258L11.777,2.91A1.092,1.092,0,0,0,11.8,1.34Z"/>
          </svg>
          Back</button>
        <button className="navigation-buttons__top" onClick={handleScrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.52" viewBox="0 0 20 20.52">
            <path id="Font_Awesome_5_solid_arrow-left" d="M11.8,1.34,10.779.323a1.1,1.1,0,0,0-1.553,0l-8.9,8.9a1.1,1.1,0,0,0,0,1.553l8.9,8.9a1.1,1.1,0,0,0,1.553,0L11.8,18.66a1.1,1.1,0,0,0-.018-1.571L6.258,11.832H19.421a1.1,1.1,0,0,0,1.1-1.1V9.267a1.1,1.1,0,0,0-1.1-1.1H6.258L11.777,2.91A1.092,1.092,0,0,0,11.8,1.34Z" transform="translate(20) rotate(90)"/>
          </svg>
          Top</button>
      </div>
    );
  }
}

export default NavigationButtons;