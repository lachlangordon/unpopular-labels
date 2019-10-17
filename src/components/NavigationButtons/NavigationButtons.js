import React, { Component } from 'react';
import {handleBack, handleScrollToTop} from "../../lib/navUtils";
import { ArrowLeft, ArrowUp } from '../Icons/SharedIcons';

class NavigationButtons extends Component {
  render() {
    return (
      <div className="navigation-buttons">
        <button className="navigation-buttons__back" onClick={handleBack}>
          <ArrowLeft  />
          Back</button>
        <button className="navigation-buttons__top" onClick={handleScrollToTop}>
          <ArrowUp />
          Top</button>
      </div>
    );
  }
}

export default NavigationButtons;
