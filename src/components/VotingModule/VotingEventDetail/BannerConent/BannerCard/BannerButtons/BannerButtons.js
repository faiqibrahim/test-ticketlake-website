import React from "react";
import { Col, Button } from "reactstrap";

import "./styles.css";

const buttonImages = {
  onWishButton: "../images/votingimages/wishlist.svg",
  onShareButton: "../images/votingimages/share.svg",
};

const checkButtonType = (key, value) => {
  let button = null;

  switch (typeof value) {
    case "function":
      const imageOrText = buttonImages[key] ? (
        <img src={buttonImages[key]} alt="img" />
      ) : null;

      button = (
        <Col md={2} key={key} className={key}>
          <Button onClick={value}>{imageOrText}</Button>
        </Col>
      );
      break;
    case "object":
      button = (
        <Col md={2} key={key} className={key}>
          <Button onClick={value.funcClick}>{value.text}</Button>
        </Col>
      );
      break;
    default:
      return button;
  }

  return button;
};

const BannerButtons = (props) => {
  const { cardButtons } = props;
  const buttonArrayData = [];

  for (const key in cardButtons) {
    if (cardButtons.hasOwnProperty(key)) {
      const button = checkButtonType(key, cardButtons[key]);

      buttonArrayData.push(button);
    }
  }

  return buttonArrayData;
};

export default BannerButtons;
