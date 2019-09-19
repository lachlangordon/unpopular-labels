import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { rhythm, scale } from '../../lib/typography';
import logo from '../../assets/maas-scss/svg/home-red.svg';

const Header = (props) => {

  const headerLinks = [
    { 'name' :  'OBJECTS', 'location': '/all' },
    { 'name' :  'THEMES', 'location': '/themes' },
    { 'name' :  'ABOUT', 'location': '/' },
  ];

  return (
    <div id="header" className="header">

      <div className="header__wrapper" style={{
          padding: rhythm(3 / 4),
          paddingBottom: `calc(${rhythm(3 / 4)} - 1px)`,
        }}>

        <nav className="header__navigation">
          <Link to="/" style={{
              display: `inline-block`,
              float: `left`,
              textDecoration: `none`,
            }}>

              <img style={{
                // not working well - need to use gatsby image for scaling
                display: `block`,
              }} src={logo} alt="Step Into Paradise" />

          </Link>

          <ul role="navigation">
          { headerLinks.map((item, i) => {
            return (
              <li key={`nav-${i}`} className="header__navigation-button">
                <Link to={item.location} style={{
                    display: `inline-block`,
                    float: `right`,
                    textDecoration: `none`,
                  }}>

                  <h1 style={{
                      ...scale(4 / 5),
                      color: `inherit`,
                      lineHeight: 1,
                      margin: 0,
                      overflow: `hidden`,
                    }}>

                    <span style={{
                        paddingRight: `calc(${rhythm(1)} - 10px)`,
                        borderRight: `1px solid rgba(0,0,0,0.3)`,
                        lineHeight: 1,
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
