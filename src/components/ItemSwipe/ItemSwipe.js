
import React from 'react';
import { Link } from 'gatsby';
// https://github.com/voronianski/react-swipe
import ReactSwipe from 'react-swipe';
// import ItemTile from '../ItemTile/ItemTile';
import ImageById from '../Image/ImageById';

const ItemSwipe = ({ relatedItems }) => {
  let reactSwipeEl;

  return (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >
				{
					relatedItems.map((object, j) => {
						if (object.object) {
								// console.log(object.object.displayTitle);
							 return object.object.mainImage && (
								 <div key={`item-tile-${j}`} >
									 <Link to={'/object/' + object.id}>
									 	 <ImageById imageId={object.object.mainImage.id} size="thumbnail" />
										 <div className="tile-info--is-breakout"> {object.object.displayTitle} </div>
									 </Link>
								 </div>
							 )
						}
					})
				}

      </ReactSwipe>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
			<button onClick={() => reactSwipeEl.next()}>Next</button>
    </div>
  );
};
/*

{
	relatedItems.map((object, j) => {
		if (object.object) {
			 object.object.mainImage && <ItemTile key={`item-tile-${j}`} url={'/object/' + object.id} imageId={object.object.mainImage.id} />
		}
	})
}


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

export default ItemSwipe;
