import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { HomeIcon, BackIcon } from '../Icons/SharedIcons';
import { rhythm, scale } from '../../lib/typography';

const Header = (props) => {
  return (
    <div id="header" className="header">
      <nav role="navigation" className="header__navigation header__wrapper" style={{
        paddingTop: rhythm(0.4),
        paddingBottom: `calc(${rhythm(0.5)} - 1px)`,
      }}>
          {
              props.location !== '/' && (
                  <Link to="/objects" className="menu-links">
                      <BackIcon/>
                  </Link>
              )
          }
        <Link to="/" className="menu-links">
            <HomeIcon style={{ marginTop: `0.4em`, ...scale(2/5) }} />
        </Link>
      </nav>
    </div>
  );
}

export default Header;
