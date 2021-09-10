import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import BannerButtons from "../BannerButtons/BannerButtons";
import classes from "./styles.module.css";

const BannerCard = (props) => {
  const { bannerContent, remainingTime } = props;
  const {
    image,
    name,
    startMonth,
    endMonth,
    startDate,
    endDate,
    secretBalloting,
  } = bannerContent;

  const cardContent = (
    <Fragment>
      <Col md={12}>
        <div className={classes.cardMonths}>
          {startMonth} - {endMonth}
        </div>
      </Col>
      <Col md={12}>
        <div className={classes.cardDates}>
          {startDate} - {endDate}
        </div>
      </Col>
      <Col md={12}>
        <div className={classes.cardName}>{name}</div>
      </Col>
      <Col md={12}>
        <div className={classes.cardBorderDesign}></div>
      </Col>
      <Col md={12}>
        <div className={classes.cardOrganization}>
          Organised by Capri Comples
        </div>
      </Col>
      <Col md={12}>
        <div className={classes.cardBalloting}>{secretBalloting}</div>
      </Col>

      <Col md={12}>
        <div className={classes.cardRemaingTime}>{remainingTime}</div>
      </Col>
    </Fragment>
  );

  const cardButtons = <BannerButtons bannerContent={{ ...props }} />;

  return (
    <Container className={classes.detailCardContainer}>
      <Row>
        <Col md={8}>
          <div className={classes.detailCardImage}>
            <img src={image} alt="img" />
          </div>
        </Col>
        <Col md={4}>
          <div className={classes.detailCardContent}>
            <Row>{cardContent}</Row>
            <Row className={classes.cardButtons}>{cardButtons}</Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default BannerCard;
