import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = (props) => (
    <header id="header" className="header">
        <Link to="/" className="logo"><strong> { props.siteTitle } </strong> </Link>
        <nav>
            <a className="menu-link" onClick={ props.onToggleMenu } href="javascript:;">Menu</a>
        </nav>
    </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
