import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./styles.module.css";

const readMoreButton = (text, isTruncated, readMoreFunc) => {
  const descriptionSlice = isTruncated ? `${text.slice(0, 350)}...` : text;
  const description = descriptionSlice;

  const paragraph = description
    .split("\n")
    .map((text) => (text.length > 0 ? <p key={text}>{text}</p> : null));

  const readMoreButton = (
    <Fragment>
      <div>{paragraph}</div>
      <span onClick={readMoreFunc} className={classes.readMore}>
        {isTruncated ? "Read More" : "Read Less"}
      </span>
    </Fragment>
  );

  return readMoreButton;
};

const DetailDescription = (props) => {
  const { title, description } = props;
  const [isTruncated, setIstruncated] = useState(true);

  const toggleTruncated = () => {
    setIstruncated(!isTruncated);
  };

  const descriptionText =
    description.length > 350
      ? readMoreButton(description, isTruncated, toggleTruncated)
      : description;

  const descriptionContent = (
    <Container className={classes.descriptinContainer}>
      <Row>
        <Col md={7}>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{descriptionText}</div>
        </Col>
      </Row>
    </Container>
  );

  return descriptionContent;
};

export default DetailDescription;
