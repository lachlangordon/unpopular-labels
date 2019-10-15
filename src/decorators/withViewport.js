import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import { canUseDOM } from '../lib/utils';
import { throttle } from 'lodash';

let EE;
let viewport = {width: 1024, height: 1366}; // Default size for server-side rendering: ipadPro
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

      // need to declare it here for removing it properly
      // https://stackoverflow.com/questions/46102738/react-event-listener-with-throttle-not-being-removed
      this.throttledResize = throttle(handleWindowResize, 16);
    }

    componentDidMount() {
      if (!EE) {
        EE = new EventEmitter();
        window.addEventListener('resize', this.throttledResize);
        window.addEventListener('orientationchange', this.throttledResize);
      }

      EE.on(RESIZE_EVENT, this.handleResize, this);
    }

    componentWillUnmount() {
      EE.removeListener(RESIZE_EVENT, this.handleResize, this);
      if (!EE.listeners(RESIZE_EVENT, true)) {
        window.removeEventListener('resize', this.throttledResize);
        window.removeEventListener('orientationchange', this.throttledResize);
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
