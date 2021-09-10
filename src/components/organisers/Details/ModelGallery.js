import React from "react";
import { Row, Col } from "antd";
import { Modal, ModalBody } from "reactstrap";
import ImageCarousel from "./Carousel";
import "./style.css";

class ModelGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      isImages: false,
      activeIndex: 0,
    };
  }

  setDetailsViewPage = () => {
    const { setDetailsView } = this.props;
    setDetailsView();
  };

  renderCarousel = () => {
    const { isImages, activeIndex } = this.state;
    const { images } = this.props;
    return (
      <Modal
        centered
        style={{ width: "900px", maxWidth: "50%" }}
        isOpen={isImages}
        toggle={this.toggleCarousel}
      >
        <ModalBody className={"modal-body"}>
          <ImageCarousel activeKey={activeIndex} images={images} />
        </ModalBody>
      </Modal>
    );
  };

  toggleCarousel = (activeIndex) => {
    const { isImages } = this.state;
    this.setState({ isImages: !isImages, activeIndex: activeIndex || 0 });
  };

  renderImages = () => {
    const { images } = this.props;
    if (!images) return null;
    return images.map((image, index) => {
      const imageSrcUrl = image.imageUrl;
      return (
        index < 4 && (
          <Col
            className={`overview-gallery-img ${
              index === 3 ? "overlapImg" : ""
            } colWidth`}
            offset={index < 1 ? 0 : 1}
            span={7}
            key={index}
            style={{
              backgroundImage: `url("${imageSrcUrl}")`,
            }}
            onClick={() => this.toggleCarousel(index)}
          >
            {index === 3 ? (
              <p className="vertical-text">+{images.length - 3}</p>
            ) : null}
          </Col>
        )
      );
    });
  };

  render() {
    return (
      <Row className="overview-gallery mt-3">
        {this.renderCarousel()}
        {this.renderImages()}
      </Row>
    );
  }
}

export default ModelGallery;
