
import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';

import Image from '../Image/Image';
// import getThumborImageUrl from 'maas-js-utils/dist/getThumborImageUrl';

// import ObjectImage from '../ObjectImage';

class ItemTile extends Component {

	render() {
    let itemTileClass = this.props.className || 'item-tile';
		const imageUrl = this.props.imageUrl;

		return (
      <div  key={this.props.id}
				    className={itemTileClass}
			      style={this.props.style}>

      	<Link to={this.props.url}>

					<div className="item-tile__image-holder">
						<Image
							alt={this.props.alt}
							className="maas-image object-image"
							src={imageUrl}
							// aspectRatio={this.props.type === 'object' ? 1.5 : 1.4}
						/>
						{this.props.imageTag && <div className="tile-image-tag">{this.props.imageTag}</div>}
					</div>

				</Link>

      </div>
		);
	}

}

/*
ItemTile.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  type: PropTypes.string,
  isBreakout: PropTypes.bool, // NOTE: WIP, may just create a new component
  className: PropTypes.string,
  imageTag: PropTypes.string,
};

ItemTile.default = {
  isBreakout: false,
}*/

export default ItemTile;
