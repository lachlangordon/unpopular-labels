/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

// layout.css
// import '../../assets/css/basic-layout.css'
import '../../assets/scss/main.scss';

// base maas-style-guide
// import '../../assets/maas-scss/main.scss';

import { rhythm, scale } from '../../lib/typography';

import Header from './Header';
import Menu from '../Menu/Menu';

import Loader from '../Loader/Loader';
import Footer from './Footer';

class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error: false,
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
      const appClassName = 'gallery-guide-app';

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
            <div className={`${appClassName} body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <div id="wrapper" style={{
                  background: `rgba(0,0,0,0.03)`,
                  minHeight: `100vh`,
                }}>
                  <Header
                    siteTitle={data.site.siteMetadata.title}
                    onToggleMenu={this.handleToggleMenu} />

                  <Loader
                    isLoading={this.state.loading}
                    error={this.state.error}
                    redirectUrl="/search"
                    redirectUrlText="Try searching for something else"
                  />

                  <div className="app__content"  style={{
                        maxWidth: 960,
                        margin: `0 auto`
                      }}>
                    {children}
                  </div>

                  {/* <Footer /> */}
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
