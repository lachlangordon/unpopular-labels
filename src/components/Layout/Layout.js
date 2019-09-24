/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import withViewport from '../../decorators/withViewport';

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

                  <nav className={`${appClassName}__sidenav`}>

                    <Header className={`${appClassName}__header`}
                            siteTitle={data.site.siteMetadata.title}  />

                  </nav>

                  <aside className={`${appClassName}__sidepanel`}>

                    <p className="section__description"
                       style={{ color: '#fff'}}
                       dangerouslySetInnerHTML={{__html: data.site.siteMetadata.description}} />

                  </aside>

                </div>

                {/* <Footer /> */}

            </div>
          )}
        />
      )
    }
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const AppLayout = withViewport(Layout);

export default AppLayout;
// export default Layout;
