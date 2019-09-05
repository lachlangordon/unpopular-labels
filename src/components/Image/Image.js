import React, { PropTypes, Component } from 'react';
import GatsbyImage from 'gatsby-image';

import { isEmpty } from 'lodash';
// import { Image as Img } from 'maas-react-components/dist/Image';

/*
 // we only care about `aspectRatio`, the rest will be passed directly to `Img`
 // also take out `className` so it be merged with our generated `orientation` class name
 const ImageOrient = ({ aspectRatio, className, ...props }) => {
   let orientation
   if (aspectRatio > 1) orientation = 'landscape'
   if (aspectRatio < 1) orientation = 'portrait'
   else orientation = 'square'

   return <Image className={`${className} ${orientation}`} {...props} />
 } */

 const isValidImage = _img =>
   _img.hasOwnProperty('src') && _img.src !== '';

const hasFluid = _img =>
  _img.hasOwnProperty('childImageSharp') && _img.childImageSharp.fluid;

const hasFixed = _img =>
  _img.hasOwnProperty('childImageSharp') && _img.childImageSharp.fixed;

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 */
class Image extends Component {

  // _image = gatsby imageNode
  getImage = (_image, _props) => {
    const { defImgMode, noImageContent } = this.props;
    const { name, src, alt, width, height } = _props;

    // MAAS image doesn't work, use std img
    if ( isEmpty(_image) && isValidImage(_props) ) {
      return <img {..._props} />
    }

    // GatsbyImage
    if ( defImgMode === 'fluid' && hasFluid(_image) ) {
      const { childImageSharp } = _image;
      return <GatsbyImage name={name} alt={alt} fluid={childImageSharp.fluid} />
    } else if ( defImgMode === 'fixed' && hasFixed(_image) ) {
      const { childImageSharp } = _image;
      return <GatsbyImage name={name} alt={alt} fixed={childImageSharp.fixed} />
    } else { // otherwise return no image ?
      return noImageContent;
    }
	}

  render() {
    const { imgObject, className, style } = this.props;

    // dont forget to append props
    let imgProps = {
      imgStyle:  this.props.imgStyle || {},
      name: imgObject ? imgObject.id : this.props.name,
      src: imgObject ? imgObject.url : this.props.src, // get valid local url
      alt: imgObject ? imgObject.caption : this.props.alt,
      width: this.props.width,
      height: this.props.height,
    };

    //
    return (
			<div className={className} style={style}>
        { this.getImage(imgObject, imgProps) }
      </div>
    );
  }
}

Image.defaultProps = {
  // def gatsby image mode: 'fluid' or 'fixed'
  defImgMode: 'fluid',
  noImageContent: (<i className='fa fa-picture-o'></i>),
}

/*
Image.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,

  // gatsby image mode
	defImgMode: PropTypes.string,
	noImageContent: PropTypes.object || PropTypes.string,
};*/

export default Image;
