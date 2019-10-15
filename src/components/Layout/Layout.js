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
import { rhythm, scale } from '../../lib/typography';
import presets from '../../lib/presets';

// base maas-style-guide
import '../../assets/maas-scss/main.scss';

import Header from './Header';
import Footer from './Footer';
import LightFooter from './LightFooter';

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
          if (window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE) {
            this.setState({ loading: '' });
          }
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

      const topTitle = `<span>JENNY KEE </span> &nbsp; &nbsp; &nbsp; <span> LINDA JACKSON </span><br>`;
      const pageTitle = `<span> STEP INTO &nbsp; PARADISE </span>`;
      const dateText = `<span> 17 October 2019 - 22 March 2020 </span>`;

      let footer = undefined;
      if (location &&
            (location.pathname === '/about' ||
             location.pathname === '/themes' ||
             location.pathname === '/objects' )
         ) {
            footer = (<Footer/>)
          } else if (location && location.pathname !== '/') {
            footer = <LightFooter/>
          }

      return (
        <StaticQuery
          query={SiteTitleQuery}
          render={data => (
            <div className={`${appClassName} body
                            ${this.state.loading} `}>
                <div className={`${appClassName}__wrapper`}>

                {/* <!-- disable jumpy loader -->
                  <Loader
                  isLoading={this.state.loading}
                  error={this.state.error}
                  redirectUrl="/search"
                  redirectUrlText="Try searching for something else"
                /> */}

                  <main className={`${appClassName}__content`}>
                    {children}

                    { footer }
                  </main>

                  <div className={`${appClassName}__sidenav`}>

                    <Header className={`${appClassName}__header`}
                            siteTitle={data.site.siteMetadata.title}
                            location={location.pathname}
                    />

                  </div>

                  <aside className={`${appClassName}__sidepanel`}>

                    <div className="container container--sm">
                        <ul className="sidepanel__content">
                             <li>
                               <h2 className="sidepanel__top-title"
                                   style={{ ...scale(1.6) }}
                                   dangerouslySetInnerHTML={{ __html: topTitle }} />
                             </li>
                             <li>
                               <h1 className="sidepanel__description"
                                   style={{ ...scale(2.1) }}
                                   dangerouslySetInnerHTML={{ __html: pageTitle }} />
                             </li>
                             <li>
                               <div className="view-guide">
                                   <p className="sidepanel__date-text"
                                      style={{ ...scale(1/3) }}
                                      dangerouslySetInnerHTML={{ __html: dateText }} />
                                   <div className="footer-mobile-icon">
                                     <MobileIcon />
                                     <span> View this guide on your phone: <br />
                                       <a href="https://maas.museum/guide"> https://maas.museum/guide </a>
                                     </span>
                                   </div>
                               </div>
                             </li>
                        </ul>
                    </div>
                  </aside>

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
