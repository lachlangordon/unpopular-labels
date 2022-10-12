
import React, { Component } from 'react';
import { Link } from 'gatsby';

import ImageByPath from '../Image/ImageByPath';
import SeenIcon from '../Icons/SeenIcon';
import QuoteIcon from '../Icons/QuoteIcon';
import {shouldShowSeenIcon, isObjectSeen} from '../../lib/session';

class ItemTileByPath extends Component {

	render() {
    const itemTileClass = this.props.className || 'item-tile';
		const { style, url, imgPath, imgFilename, imageTag, objectId, hasQuote, title } = this.props;

		return (
			<Link to={url} className={`item-tile__image-holder ${itemTileClass}`} style={style}>
				<div className="item-tile-img">
					<ImageByPath path={imgPath} filename={imgFilename} />
				</div>
				<div className="item-tile-info">
					<div dangerouslySetInnerHTML={{__html: title}}/>
					{ shouldShowSeenIcon() && isObjectSeen(objectId) && <SeenIcon/> }
				</div>
			</Link>
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

export default ItemTileByPath;
