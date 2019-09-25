import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { rhythm, scale } from '../../lib/typography';
import presets from '../../lib/presets';
import logo from '../../assets/maas-scss/svg/home-red.svg';

const Header = (props) => {

  const headerLinks = [
    { 'name' :  'OBJECTS', 'location': '/all' },
    { 'name' :  'THEMES', 'location': '/themes' },
    { 'name' :  'ABOUT', 'location': '/about' },
  ];

  return (
    <div id="header" className="header">

      <div className="header__wrapper" style={{
          padding: rhythm(3 / 4),
          paddingLeft: `0.7em`,
          paddingBottom: `calc(${rhythm(3 / 4)} - 1px)`,
        }}>

        <nav className="header__navigation">
          <Link to="/" className="menu-links">

              <img style={{
                // not working well - need to use gatsby image for scaling
                ...scale(1/5),
              }} src={logo} alt="Step Into Paradise" />

          </Link>

          <ul role="navigation">
          { headerLinks.map((item, i) => {
            return (
              <li key={`nav-${i}`} className="header__navigation-button">
                <Link to={item.location} className="menu-links">

                  <h1 style={{
                      ...scale(3 / 5),
                      [presets.xlg]: {
                        ...scale(1),
                      },
                    }}>

                    <span style={{
                        paddingRight: `calc(${rhythm(1)} - 10px)`,
                        marginLeft: rhythm(1),
                      }}>
                      {item.name}
                    </span>

                  </h1>
                </Link>
              </li>
            )
          })}
          </ul>
        </nav>

      </div>

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
