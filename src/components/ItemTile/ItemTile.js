
import React, { Component } from 'react';
import { Link } from 'gatsby';

import ImageById from '../Image/ImageById';
import SeenIcon from '../SeenIcon/SeenIcon';
import {shouldShowSeenIcon, isObjectSeen} from '../../lib/session';

class ItemTile extends Component {

	render() {
    const itemTileClass = this.props.className || 'item-tile';
		const { style, url, imageId, imageUrl, imageTag, objectId } = this.props;
		return (
      <div className={itemTileClass}
			     style={style}>

      	<Link to={url}>
					<div className="item-tile__image-holder">
						<ImageById imageId={imageId} />
						{ imageTag && <div className="tile-image-tag">{imageTag}</div> }
						{ shouldShowSeenIcon() && isObjectSeen(objectId) && <SeenIcon/> }
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
