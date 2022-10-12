import React, { Component } from 'react';

class SongListing extends Component {

    render() {
        return (
            <div className="song-listing">
              <a onClick={this.props.onClick}>{this.props.title}</a>
            </div>
        )
    }
}

export default SongListing;