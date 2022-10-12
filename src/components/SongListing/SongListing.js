import React, { Component } from 'react';

class SongListing extends Component {

    render() {
        return (
            <div className="song-listing">
              <a onClick={this.props.onClick}>
                  <span>{this.props.title}</span>
                  <span>{this.props.subtitle}</span>
              </a>
            </div>
        )
    }
}

export default SongListing;