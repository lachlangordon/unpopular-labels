/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

// import withViewport from '../../decorators/withViewport';

import { rhythm, scale } from '../../lib/typography';
import presets from '../../lib/presets';

// base maas-style-guide
import '../../assets/maas-scss/main.scss';

import Header from './Header';
import Menu from '../Menu/Menu';

import Loader from '../Loader/Loader';
import Footer from './Footer';

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
      const { children } = this.props;
      const appClassName = 'guide-app';

      const topTitle = `<span>JENNY KEE </span> &nbsp; &nbsp; &nbsp; <span> LINDA JACKSON </span><br>`;
      const pageTitle = `<span> STEP INTO &nbsp; PARADISE </span>`;
      const dateText = `<span> 17 October 2019 - 22 March 2020 </span>`;

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

                  <Loader
                    isLoading={this.state.loading}
                    error={this.state.error}
                    redirectUrl="/search"
                    redirectUrlText="Try searching for something else"
                  />

                  <main className={`${appClassName}__content`}>
                    {children}
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

                  </aside>

                </div>

                {/* <Footer /> */}

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
