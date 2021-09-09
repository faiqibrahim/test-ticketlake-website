import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./styles.module.css";

const DetailDescription = (props) => {
  const { title, description } = props;

  const descriptionText = description
    .split("\n")
    .map((text) => (text.length > 0 ? <p key={text}>{text}</p> : null));

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
