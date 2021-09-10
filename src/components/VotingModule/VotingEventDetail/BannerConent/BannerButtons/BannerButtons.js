import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";

import classes from "./styles.module.css";

const BannerButtons = (props) => {
  const { bannerContent, shareClick, wishClick } = props.bannerContent;
  const { votePrice } = bannerContent;

  const buttons = (
    <Fragment>
      <Col md={2}>
        {shareClick ? (
          <Button className={classes.cardShareButton} onClick={shareClick}>
            <img src={"../images/votingimages/Share.svg"} alt="img" />
          </Button>
        ) : null}
      </Col>
      <Col md={2}>
        {wishClick ? (
          <Button className={classes.cardWishButton} onClick={wishClick}>
            <img src={"../images/votingimages/heart.svg"} alt="img" />
          </Button>
        ) : null}
      </Col>
      <Col md={8}>
        <Button className={classes.cardAddButton}>{votePrice}</Button>
      </Col>
    </Fragment>
  );

  return <Fragment>{buttons}</Fragment>;
};
export default BannerButtons;
