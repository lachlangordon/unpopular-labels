import React, { Component } from 'react';
import GatsbyImage from 'gatsby-image';

import { Image as Img } from 'maas-react-components/dist/Image';
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

 /*
  * This component is built using `gatsby-image` to automatically serve optimized
  * images with lazy loading and reduced file sizes.
  *
  * For more information, see the docs:
  * - `gatsby-image`: https://gatsby.dev/gatsby-image
  */

const isValidImage = _img =>
  _img.hasOwnProperty('src') && _img.src;

const hasFluid = _img =>
  _img.hasOwnProperty('fields') && _img.fields.localFile.childImageSharp.fluid;

const hasFixed = _img =>
  _img.hasOwnProperty('fields') && _img.fields.localFile.childImageSharp.fixed;

class Image extends Component {

  getImage = (_image, _props) => {
    const { defImgMode, noImageContent } = _props;

    // gatsby image
    if (defImgMode === 'fluid' && hasFluid(_image)) {
      const { childImageSharp } = _image.fields.localFile;
      return <GatsbyImage fluid={childImageSharp.fluid} />
    } else if (defImgMode === 'fixed' && hasFixed(_image)) {
      const { childImageSharp } = _image.fields.localFile;
      return <GatsbyImage fixed={_image.childImageSharp.fixed} />
    } else if (isValidImage(_image)) { // MAAS image
      return <Img src={_image.url}  />
    } else { // otherwise return no image ?
      return noImageContent;
    }
	}

  render() {
    const { imageNode, className, style, imgStyle, defImgMode, noImageContent } = this.props;

    // dont forget to append props
    let imgProps = {
      imgStyle,
      name: imageNode.id,
      src: imageNode.url, // get valid local url
      width: imageNode.width,
      height: imageNode.height,

    };

    return (
			<div className={className} style={style}>
        { this.getImage(imageNode, imgProps) }
      </div>
    );

  }
}

Image.defaultProps = {
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
	aspectRatio: PropTypes.number, // Width / Height
	srcSet: PropTypes.string,
	sizes: PropTypes.string,

  // gatsby image mode
  fluid: PropTypes.object,
  fixed: PropTypes.object,

	noImageContent: PropTypes.object || PropTypes.string,
	onClick: PropTypes.func,
	isHandleImageError: PropTypes.bool,
}; */

export default Image;
