import React from 'react';

import { BackIcon } from '../Icons/SharedIcons';
import {handleBack} from "../../lib/navUtils";

const Header = (props) => {

  return (
    <div id="header" className="header">
      {
          props.location !== '/' && (
              <nav role="navigation" className="header__navigation header__wrapper">

                {
                  (props.location.includes('/track/') || props.location.includes('/credits')) && (
                      <a onClick={handleBack} to="/tracks" className="menu-links back">
                        <div className="header-title">{ props.siteTitle }</div>
                      </a>
                  )
                }
              </nav>
          )
      }
    </div>
  );
}

export default Header;
