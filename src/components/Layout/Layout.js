/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

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
          isMenuVisible: false,
          loading: 'is-loading'
      };
      // console.log(props);
      // this.handleToggleMenu = this.handleToggleMenu.bind(this)
    }

    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: ''});
        }, 100);

        // console.log(window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE);
    }

    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    //
    // componentDidUpdate (prevProps) {
    //   // if (this.props.viewport.width !== prevProps.viewport.width) {
    //     const { viewport, returnViewportSize } = this.props;
    //     returnViewportSize(viewport);
    //   // }
    // }

    render() {
      const { location, children } = this.props;
      const appClassName = 'guide-app';

      const topTitle = `<span>JENNY KEE </span> &nbsp; &nbsp; &nbsp; <span> LINDA JACKSON </span><br>`;
      const pageTitle = `<span> STEP INTO &nbsp; PARADISE </span>`;
      const dateText = `<span> 17 October 2019 - 22 March 2020 </span>`;

      let footer = undefined;
      if (location && location.pathname === '/about' || location.pathname === '/themes' || location.pathname === '/objects') {
        footer = (<Footer/>)
      } else if (location && location.pathname !== '/') {
        footer = <LightFooter/>
      }
      return (
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                  description
                }
              }
            }
          `}
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
                            siteTitle={data.site.siteMetadata.title}  />

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
                                   <span> View this guide on your phone: <br />
                                     <a href="https://maas.museum/guide"> https://maas.museum/guide </a>
                                   </span>
                               </div>
                             </li>
                        </ul>
                    </div>

                    <div className="sidepanel__logo">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.3 68.1">
                        <title>maas_logo</title>
                        <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                          <polygon className="cls-1" points="22.6 0 16.8 15.8 11.1 0 0.5 0 0.5 31.3 8.9 31.3 8.9 15.2 12.6 25.4 21 25.4 24.7 15.2 24.7 31.3 33.2 31.3 33.2 0 22.6 0"/>
                          <polygon className="cls-1" points="56.1 0 47.7 0 36.3 31.3 44.7 31.3 46.6 26.2 54.6 26.2 57.2 19 49.2 19 56.1 0"/>
                          <path className="cls-1" d="M106.5,48.1l-4.2-.8c-2-.4-2.7-1.1-2.7-2.1,0-1.4,1.5-2.2,3.5-2.2a13.73,13.73,0,0,1,5.9,1.6h0a23.58,23.58,0,0,1,3.5,2.3l2.3-6.3c-3.1-3.4-7.2-4.4-11.3-4.4-6.4,0-11.7,3.2-11.7,9.5,0,5.1,3.7,8.9,8.8,9.7l4.8.9c2.3.4,3.1,1.1,3.1,2.4,0,1.5-2.7,3-6.8,2a14.23,14.23,0,0,1-5.5-2.8A21.32,21.32,0,0,1,94,55.8l-2.6,7c2.9,3.6,8.2,5.3,12.6,5.3,7,0,12.3-4.2,12.3-10.1-.2-5.8-3.7-8.7-9.8-9.9"/>
                          <polygon className="cls-1" points="70.6 36.5 79 36.5 90.3 67.8 81.9 67.8 80.1 62.7 69.5 62.7 72.1 55.6 77.5 55.6 70.6 36.5"/>
                          <path className="cls-1" d="M53.7,64.2l-.8-.1c-.4-.1-.5-.2-.5-.4s.3-.4.6-.4a3,3,0,0,1,1.1.3h0a1.54,1.54,0,0,1,.6.4l.4-1.2A2.78,2.78,0,0,0,53,62c-1.2,0-2.1.6-2.1,1.7a1.91,1.91,0,0,0,1.6,1.8l.9.2c.4.1.6.2.6.4s-.5.6-1.2.4a3.09,3.09,0,0,1-1-.5c-.1-.1-.3-.2-.4-.4l-.5,1.3a2.9,2.9,0,0,0,2.3,1,2.07,2.07,0,0,0,2.3-1.8c0-1.2-.7-1.7-1.8-1.9"/>
                          <path className="cls-1" d="M63.6,52.4l-.8-.1c-.4-.1-.5-.2-.5-.4s.3-.4.6-.4a3,3,0,0,1,1.1.3h0a1.54,1.54,0,0,1,.6.4L65,51a2.78,2.78,0,0,0-2.1-.8c-1.2,0-2.1.6-2.1,1.7a1.91,1.91,0,0,0,1.6,1.8l.9.2c.4.1.6.2.6.4s-.5.6-1.2.4a3.09,3.09,0,0,1-1-.5c-.1-.1-.3-.2-.4-.4l-.5,1.3a2.9,2.9,0,0,0,2.3,1,2.07,2.07,0,0,0,2.3-1.8,1.88,1.88,0,0,0-1.8-1.9"/>
                          <path className="cls-1" d="M18.6,41.1l-.8-.1c-.4-.1-.5-.2-.5-.4s.3-.4.6-.4a3,3,0,0,1,1.1.3h0a1.54,1.54,0,0,1,.6.4l.4-1.2a2.78,2.78,0,0,0-2.1-.8c-1.2,0-2.1.6-2.1,1.7a1.91,1.91,0,0,0,1.6,1.8l.9.2c.4.1.6.2.6.4s-.5.6-1.2.4a3.09,3.09,0,0,1-1-.5c-.1-.1-.3-.2-.4-.4l-.5,1.3a2.9,2.9,0,0,0,2.3,1A2.07,2.07,0,0,0,20.4,43c0-1.2-.7-1.7-1.8-1.9"/>
                          <polygon className="cls-1" points="6.8 44.6 8.4 44.6 8.4 36.6 6.3 36.6 4.4 41.3 2.6 36.6 0.4 36.6 0.4 44.6 2.1 44.6 2.1 39.4 3.4 43 5.4 43 6.8 39.3 6.8 44.6"/>
                          <path className="cls-1" d="M9.7,39v3.3c0,1.6.8,2.5,2.1,2.5a2,2,0,0,0,1.4-.5l.1-.1v.5h1.5V39.1H13.3V42c0,1-.3,1.4-1,1.4s-.9-.4-.9-1.1V39.1L9.7,39Z"/>
                          <path className="cls-1" d="M24.9,41.2H22.7v-.1a1.07,1.07,0,0,1,1.1-.9,1,1,0,0,1,1.1,1Zm-1-2.3a2.71,2.71,0,0,0-2.7,3,2.78,2.78,0,0,0,2.9,2.9,2.77,2.77,0,0,0,2.4-1.1l-1-.9a1.82,1.82,0,0,1-1.4.6,1.22,1.22,0,0,1-1.3-1.1v-.1h3.9v-.4a2.81,2.81,0,0,0-2.8-2.9"/>
                          <path className="cls-1" d="M27.5,39v3.3c0,1.6.8,2.5,2.1,2.5a2,2,0,0,0,1.4-.5l.1-.1v.5h1.5V39.1H31.1V42c0,1-.3,1.4-1,1.4s-.9-.4-.9-1.1V39.1L27.5,39Z"/>
                          <path className="cls-1" d="M40.8,44.6h1.5V41.3c0-1.6-.8-2.5-2.3-2.5a2.84,2.84,0,0,0-1.7.7h0a2.13,2.13,0,0,0-1.5-.7,1.76,1.76,0,0,0-1.3.5l-.1.1v-.5H33.9v5.6h1.5V41.6c0-.9.4-1.4,1-1.4s.9.4.9,1.1v3.2h1.5v-3c0-.8.4-1.3,1-1.3s.9.4.9,1.1l.1,3.3Z"/>
                          <path className="cls-1" d="M48.7,43.3a1.5,1.5,0,1,1,1.4-1.5,1.39,1.39,0,0,1-1.4,1.5m0-4.4a2.93,2.93,0,0,0-3,2.9,2.86,2.86,0,0,0,3,2.9,2.9,2.9,0,1,0,0-5.8"/>
                          <path className="cls-1" d="M52.8,44.6h1.5V40.4h1.3V39H54.3v-.1c0-.6.3-.9,1.1-.9h.2V36.6h-.4c-1.6,0-2.5.8-2.5,2.2V39H52v1.4h.7v4.2Z"/>
                          <path className="cls-1" d="M11.4,54.6a1.5,1.5,0,1,1,1.4-1.5,1.39,1.39,0,0,1-1.4,1.5M8.5,58.1H10V55.4l.1.1a2.17,2.17,0,0,0,1.4.5,2.76,2.76,0,0,0,2.8-2.9,2.7,2.7,0,0,0-2.8-2.9,2.05,2.05,0,0,0-1.4.5l-.1.1v-.5H8.5Z"/>
                          <path className="cls-1" d="M18.2,54.6a1.5,1.5,0,1,1,1.4-1.5,1.39,1.39,0,0,1-1.4,1.5m-2.9,3.5h1.5V55.4l.1.1a2.17,2.17,0,0,0,1.4.5,2.76,2.76,0,0,0,2.8-2.9,2.7,2.7,0,0,0-2.8-2.9,2.05,2.05,0,0,0-1.4.5l-.1.1v-.5H15.3Z"/>
                          <rect className="cls-1" x="22.1" y="47.9" width="1.5" height="8"/>
                          <path className="cls-1" d="M25.8,47.7a.9.9,0,1,0,.9.9.9.9,0,0,0-.9-.9M25,55.9h1.6V50.3H25.1L25,55.9Z"/>
                          <path className="cls-1" d="M31.4,52.5H29.2v-.1a1.11,1.11,0,0,1,2.2.1Zm-1.1-2.3a2.71,2.71,0,0,0-2.7,3,2.78,2.78,0,0,0,2.9,2.9A2.77,2.77,0,0,0,32.9,55l-1-.9a1.82,1.82,0,0,1-1.4.6,1.22,1.22,0,0,1-1.3-1.1v-.1h3.9v-.4a2.81,2.81,0,0,0-2.8-2.9"/>
                          <path className="cls-1" d="M36.6,54.6A1.5,1.5,0,1,1,38,53.1a1.39,1.39,0,0,1-1.4,1.5m-.2-4.4a2.76,2.76,0,0,0-2.8,2.9A2.7,2.7,0,0,0,36.4,56a2.05,2.05,0,0,0,1.4-.5l.1-.1v.5h1.5v-8H37.9v2.9l-.1-.1a1.68,1.68,0,0,0-1.4-.5"/>
                          <path className="cls-1" d="M48.8,52.9H46.5l1.1-3.2Zm1.1,3h1.7l-2.9-8h-2l-2.9,8h1.7l.6-1.6h3.4Z"/>
                          <path className="cls-1" d="M5.1,52.9H2.8l1.1-3.2Zm1,3H7.8l-2.9-8h-2L0,55.9H1.6l.6-1.6H5.6Z"/>
                          <path className="cls-1" d="M52.2,55.9h1.5V53.6c0-1.2.6-1.8,1.6-1.8h.2V50.3h-.4a1.68,1.68,0,0,0-1.4.6l-.1.1v-.6H52.1v5.5Z"/>
                          <path className="cls-1" d="M56.4,51.7h.7v2.2c0,1.3.6,2,1.9,2h.8V54.5h-.4c-.4,0-.8-.1-.8-.8v-2h1.3V50.3H58.6V48.7H57.1v1.6h-.7Z"/>
                          <path className="cls-1" d="M3.3,62.4l-.1-.1a1.33,1.33,0,0,1-.3-.7.58.58,0,0,1,.6-.6c.4,0,.6.2.6.5s-.1.5-.6.8Zm-.2,4c-.7,0-1.2-.4-1.2-1a1.4,1.4,0,0,1,.8-1.1l.1-.1h0L4.1,66h0a1.28,1.28,0,0,1-1,.4m.3-6.8a2,2,0,0,0-2.2,1.9,2.66,2.66,0,0,0,.6,1.6v.1l-.1.1A2.54,2.54,0,0,0,.3,65.6,2.39,2.39,0,0,0,3,68a3.38,3.38,0,0,0,2-.6H5l.4.5H7.2L6,66.3H6a7.07,7.07,0,0,0,1.1-2.5H5.6A4.23,4.23,0,0,1,5.2,65v.1L4.1,63.8l.2-.2a2.16,2.16,0,0,0,1.3-1.9,2,2,0,0,0-2.2-2.1"/>
                          <path className="cls-1" d="M20.9,62a2.93,2.93,0,0,0-3,2.9,2.86,2.86,0,0,0,3,2.9,3,3,0,0,0,2.4-1.1l-1-1a1.57,1.57,0,0,1-1.3.7,1.39,1.39,0,0,1-1.4-1.5A1.45,1.45,0,0,1,21,63.4a1.41,1.41,0,0,1,1.2.6l1-1a3,3,0,0,0-2.3-1"/>
                          <path className="cls-1" d="M25,59.6a.9.9,0,1,0,.9.9.9.9,0,0,0-.9-.9m-.8,8.1h1.5V62.1H24.2Z"/>
                          <path className="cls-1" d="M30.5,64.3H28.3v-.1a1.1,1.1,0,0,1,1.1-.9,1,1,0,0,1,1.1,1Zm-1-2.3a2.71,2.71,0,0,0-2.7,3,2.78,2.78,0,0,0,2.9,2.9,2.77,2.77,0,0,0,2.4-1.1l-1-.9a1.82,1.82,0,0,1-1.4.6,1.22,1.22,0,0,1-1.3-1.1v-.1h3.9v-.4A2.87,2.87,0,0,0,29.5,62"/>
                          <path className="cls-1" d="M36.7,67.7h1.5V64.4a2.21,2.21,0,0,0-2.3-2.5,2,2,0,0,0-1.3.5l-.1.1V62H33v5.6h1.6V64.8c0-1,.4-1.5,1.1-1.5s1,.4,1,1.2Z"/>
                          <path className="cls-1" d="M42,62a2.93,2.93,0,0,0-3,2.9,2.86,2.86,0,0,0,3,2.9,3,3,0,0,0,2.4-1.1l-1-1a1.57,1.57,0,0,1-1.3.7,1.39,1.39,0,0,1-1.4-1.5,1.45,1.45,0,0,1,1.4-1.5,1.41,1.41,0,0,1,1.2.6l1-1A3,3,0,0,0,42,62"/>
                          <path className="cls-1" d="M48.6,64.3H46.4v-.1a1.11,1.11,0,0,1,2.2.1ZM47.5,62a2.71,2.71,0,0,0-2.7,3,3,3,0,0,0,5.3,1.8l-1-.9a1.82,1.82,0,0,1-1.4.6,1.22,1.22,0,0,1-1.3-1.1v-.1h3.9v-.4A2.81,2.81,0,0,0,47.5,62"/>
                          <path className="cls-1" d="M16.4,62.1l.6-1.4a4.31,4.31,0,0,0-2.8-1.2c-1.5-.1-3,.7-3.1,2.2-.1,1.3.8,2.2,2.4,2.5l1,.2c.8.2,1.2.5,1.1,1s-.6.9-1.5.9a2.45,2.45,0,0,1-1.6-.6c-.2-.1-.5-.4-.9-.7L11,66.5a3.93,3.93,0,0,0,2.9,1.3c1.9.1,3.2-.8,3.3-2.2s-.8-2.2-2.5-2.6l-.8-.2c-.8-.2-1.2-.5-1.2-1s.6-.8,1.3-.8a3.55,3.55,0,0,1,1,.2h0a4.77,4.77,0,0,1,1.4.9"/>
                        </g>
                        </g>
                      </svg>
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

// const AppLayout = withViewport(Layout);

// export default AppLayout;
export default Layout;
