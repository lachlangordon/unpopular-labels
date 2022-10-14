import React, { Component } from 'react';

class SongListing extends Component {

    render() {
        return (
            <div className={`song-listing ${this.props.active ? 'active': ''}`}>
              <a onClick={this.props.onClick}>
                  <div className="track">{this.props.track}</div>
                  <div>
                    <div className="title">{this.props.title}</div>
                    <div className="subtitle">{this.props.subtitle}</div>
                  </div>

              </a>
            </div>
        )
    }
}

export default SongListing;