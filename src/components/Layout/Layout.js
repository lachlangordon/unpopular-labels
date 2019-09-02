/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

// layout.css
// import '../assets/css/basic-layout.css'
import '../../assets/scss/main.scss';

import Header from './Header';
import Menu from '../Menu/Menu';
// import Contact from './contact'

import Loader from '../Loader/Loader';
import Footer from './Footer';

class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isMenuVisible: false,
          loading: 'is-loading'
      };
      // this.handleToggleMenu = this.handleToggleMenu.bind(this)
    }

    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: ''});
        }, 100);
    }

    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    handleToggleMenu = () => {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        });
    }

    render() {
      const { children } = this.props;
      return (
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <div id="wrapper">
                  <Header
                      siteTitle={data.site.siteMetadata.title}
                      onToggleMenu={this.handleToggleMenu} />

                  <Loader
                    isLoading={this.props.loading}
                    error={this.props.error}
                    redirectUrl="/search"
                    redirectUrlText="Try searching for something else"
                  />


                  {children}
                  <Footer />
                </div>
                <Menu onToggleMenu={this.handleToggleMenu} />

            </div>
          )}
        />
      )
    }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
