import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import CardContent from "./CardContent/CardContent";
import BannerButtons from "./BannerButtons/BannerButtons";
import classes from "./styles.module.css";

const BannerCard = (props) => {
  const { cardImage, cardContent, cardButtons } = props;

  const renderCard = <CardContent cardContent={cardContent} />;

  const renderButtons = <BannerButtons cardButtons={cardButtons} />;

  return (
    <Container className={classes.detailCardContainer}>
      <Row>
        <Col md={8} className={classes.bannerCardCol}>
          <div className={classes.detailCardImage}>
            <img src={cardImage} alt="img" />
          </div>
        </Col>
        <Col md={4} className={classes.bannerCardCol}>
          <div className={classes.detailCardContent}>
            <Row>{renderCard}</Row>
            <Row className={classes.cardButtons}>{renderButtons}</Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default BannerCard;
