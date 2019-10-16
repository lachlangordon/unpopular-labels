import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { HomeIcon } from '../Icons/SharedIcons';
import { rhythm, scale } from '../../lib/typography';

const Header = (props) => {

  const headerLinks = [
    { 'name' :  'OBJECTS', 'location': '/all'},
    { 'name' :  'THEMES', 'location': '/themes'},
    { 'name' :  'ABOUT', 'location': '/about' },
  ];

  return (
    <div id="header" className="header">
        <nav className="header__navigation header__wrapper" style={{
          paddingTop: rhythm(0.4),
          paddingBottom: `calc(${rhythm(0.5)} - 1px)`,
        }}>
          <Link to="/" className="menu-links">
              <HomeIcon style={{ marginTop: `0.4em`, ...scale(2/5) }} />
          </Link>

          <ul role="navigation">
          { headerLinks.map((item, i) => {
            return (
              <li key={`nav-${i}`} className="header__navigation-button">
                <Link to={item.location} className="menu-links">
                    <div style={{ ...scale(4 / 5) }}>
                      <span style={{
                          paddingRight: rhythm(0.7),
                          marginLeft: rhythm(0.7),
                        }}>
                        {item.name}
                      </span>
                    </div>
                </Link>
              </li>
            )
          })}
          </ul>
        </nav>
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
