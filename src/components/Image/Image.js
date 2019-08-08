import React, { Component } from "react"
import GatsbyImage from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `StaticQuery`: https://gatsby.dev/staticquery
 */

class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { imgNode } = this.props

    const { fields } = imgNode.node
    const isImgSharp = fields !== null && fields.localFile.childImageSharp

    // const {
    //   image: {
    //     localFile: {
    //       childImageSharp: { fluid }
    //     }
    //   },
    //   onClick,
    //   imageFeatured = null
    // } = this.props

    // console.log(fields)
    if ( isImgSharp ) {
      return ( fields.localFile.childImageSharp.fixed ?
                  <GatsbyImage fixed={fields.localFile.childImageSharp.fixed} /> :
                    <GatsbyImage fluid={fields.localFile.childImageSharp.fluid} /> )
    } else if ( imgNode.node.url ) {
      return <img src={imgNode.node.url} />
    }
  }
}

// Image.propTypes = {
//   imgNode: PropTypes.object.isRequired,
// }

export default Image
