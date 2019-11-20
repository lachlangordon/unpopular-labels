
import React, { Component } from 'react';
import { Link } from 'gatsby';

import ImageById from '../Image/ImageById';
import ImageByIdNoBase64 from '../Image/ImageByIdNoBase64';
import SeenIcon from '../Icons/SeenIcon';
import QuoteIcon from '../Icons/QuoteIcon';
import {shouldShowSeenIcon, isObjectSeen} from '../../lib/session';

class ItemTile extends Component {

	render() {
    const itemTileClass = this.props.className || 'item-tile';
		const { style, url, imageId, imageUrl, imageTag, objectId, hasQuote, title, useBase64 } = this.props;
		const showIconDiv = hasQuote || (shouldShowSeenIcon() && isObjectSeen(objectId));
		return (
      	<Link to={url} className={`item-tile__image-holder ${itemTileClass}`} style={style}>

						{ useBase64 ? (<ImageById imageId={imageId} alt={title}/>) : (<ImageByIdNoBase64 imageId={imageId} alt={title}/>) }
						{ showIconDiv && (
							<div className="item-tile__icon-holder">
								{ shouldShowSeenIcon() && isObjectSeen(objectId) && <SeenIcon/> }
								{ hasQuote && <QuoteIcon/>}
							</div>
						)}

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

export default ItemTile;
