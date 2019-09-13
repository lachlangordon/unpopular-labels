
import React, { Component } from 'react';
import { Link } from 'gatsby';

import ImageById from '../Image/ImageById';

// import ObjectImage from '../ObjectImage';

class ItemTile extends Component {

	render() {
    const itemTileClass = this.props.className || 'item-tile';
		const { style, url, imageId, imageUrl } = this.props;
		return (
      <div className={itemTileClass}
			     style={style}>

      	<Link to={url}>
					<div className="item-tile__image-holder">
						<ImageById imageId={imageId} />
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
