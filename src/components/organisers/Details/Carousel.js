import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class ImageCarousel extends Component {
  render() {
    const { activeKey, images } = this.props;
    return (
      <Carousel
        showStatus={false}
        selectedItem={activeKey}
        className="model-carousel"
        showIndicators={false}
      >
        {images.map((image, index) => {
          const imageSrcUrl = image.imageUrl;
          return (
            <div key={index}>
              <img src={imageSrcUrl} alt={image.FileName} />
            </div>
          );
        })}
      </Carousel>
    );
  }
}

export default ImageCarousel;
