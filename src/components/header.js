import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = (props) => (
    <header id="header" className="alt">
      <nav>
        <Link to="/" className="logo"><strong> Home </strong> </Link>
        <Link to="/all" className="logo"><strong> All </strong> </Link>
        <Link to="/themes" className="logo"><strong> Themes </strong> </Link>
      </nav>
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
