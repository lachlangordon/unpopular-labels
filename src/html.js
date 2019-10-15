import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { shouldShowSeenIcon } from './lib/session';

export default class HTML extends Component {
  render() {
    const { headComponents , htmlAttributes, bodyAttributes, preBodyComponents, body, postBodyComponents} = this.props
    return (
      <html {...htmlAttributes}>  {/* eslint-disable-line */}
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          { !shouldShowSeenIcon() && (
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          )}

          {/* Add custom css or scripts here */}

          {/* Add custom css or scripts here */}

          {headComponents}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,    // eslint-disable-line
  headComponents: PropTypes.array,     // eslint-disable-line
  bodyAttributes: PropTypes.object,    // eslint-disable-line
  preBodyComponents: PropTypes.array,  // eslint-disable-line
  body: PropTypes.string,                // eslint-disable-line
  postBodyComponents: PropTypes.array, // eslint-disable-line
}
