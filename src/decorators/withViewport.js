import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import { canUseDOM } from '../lib/utils';
import { throttle } from 'lodash';

let EE;
let viewport = {width: 1024, height: 1366}; // Default size for server-side rendering
const RESIZE_EVENT = 'resize';

function handleWindowResize() {
  if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
    viewport = {width: window.innerWidth, height: window.innerHeight};
    EE.emit(RESIZE_EVENT, viewport);
  }
}

function withViewport(ComposedComponent) {
  return class WithViewport extends Component {

    constructor() {
      super();

      this.state = {
        viewport: canUseDOM() ? {width: window.innerWidth, height: window.innerHeight} : viewport,
      };
    }

    componentDidMount() {
      if (!EE) {
        EE = new EventEmitter();
        window.addEventListener('resize', throttle(handleWindowResize, 16));
        // window.addEventListener('orientationchange', handleWindowResize);
      }

      EE.on(RESIZE_EVENT, this.handleResize, this);
    }

    componentWillUnmount() {
      EE.removeListener(RESIZE_EVENT, this.handleResize, this);
      if (!EE.listeners(RESIZE_EVENT, true)) {
        window.removeEventListener('resize', throttle(handleWindowResize, 16));
        // window.removeEventListener('orientationchange', handleWindowResize);
        EE = null;
      }
    }

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport}/>;
    }

    handleResize(value) {
      this.setState({viewport: value}); // eslint-disable-line react/no-set-state
    }

  };
}

export default withViewport;
