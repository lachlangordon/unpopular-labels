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
                  props.location.includes('/object/') && (
                      <a onClick={handleBack} to="/objects" className="menu-links back">
                        <BackIcon/>
                      </a>
                  )
                }
                {
                  props.location.includes('/object/') && (
                      <div class="header-title">Robert Rosen Audio Files</div>
                  )
                }
              </nav>
          )
      }
    </div>
  );
}

export default Header;
