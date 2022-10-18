/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { MobileIcon } from '../Icons/SharedIcons';
import { scale } from '../../lib/typography';

// base maas-style-guide
import '../../assets/maas-scss/main.scss';

import Header from './Header';
import Footer from './Footer';
import LightFooter from './LightFooter';
import AlbumPlayer from "../AlbumPlayer/AlbumPlayer";

class Layout extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: false,
          loading: 'is-loading'
      };
    }

    componentDidMount () {
      // console.log(window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE);
      this.timeoutId = setTimeout(() => {
        this.setState({ loading: '' });
      }, 100);
    }

    componentWillUnmount () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }

    render() {
      const { location, children } = this.props;
      const appClassName = 'guide-app';

      return (
        <StaticQuery
          query={SiteTitleQuery}
          render={data => (
            <div className={`${appClassName} body ${appClassName}__wrapper
                            ${this.state.loading} `}>

                {/* <!-- disable jumpy loader -->
                  <Loader
                  isLoading={this.state.loading}
                  error={this.state.error}
                  redirectUrl="/search"
                  redirectUrlText="Try searching for something else"
                /> */}

                  <main className={`${appClassName}__content`}>
                    {children}
                  </main>


                  <div className={`${appClassName}__sidenav`}>

                    <Header className={`${appClassName}__header`}
                            siteTitle={data.site.siteMetadata.title}
                            location={location.pathname}
                    />

                  </div>

            </div>
          )}
        />
      )
    }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const SiteTitleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default Layout;
