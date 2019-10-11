import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { rhythm, scale } from '../../lib/typography';
import presets from '../../lib/presets';

const Header = (props) => {

  const headerLinks = [
    { 'name' :  'OBJECTS', 'location': '/all'},
    { 'name' :  'THEMES', 'location': '/themes', 'partialLocation': '/set'},
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

              <div style={{
                // not working well - need to use gatsby image for scaling
                ...scale(1/5),
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 25 25">
                  <path id="Path" d="M25,11.719V23.438a1.6,1.6,0,0,1-.412,1.1,1.267,1.267,0,0,1-.977.464H15.278V15.625H9.722V25H1.389a1.267,1.267,0,0,1-.977-.464A1.6,1.6,0,0,1,0,23.438V11.719a.372.372,0,0,1,.011-.073.372.372,0,0,0,.011-.073L12.5,0,24.978,11.572A.378.378,0,0,1,25,11.719Z" fillRule="evenodd"/>
                </svg>
              </div>

          </Link>

          <ul role="navigation">
          { headerLinks.map((item, i) => {
            console.log(item.partialLocation && props.location.includes(item.partialLocation));
            return (
              <li key={`nav-${i}`} className="header__navigation-button">
                <Link to={item.location} className="menu-links">

                  <div style={{
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

                  </div>
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
