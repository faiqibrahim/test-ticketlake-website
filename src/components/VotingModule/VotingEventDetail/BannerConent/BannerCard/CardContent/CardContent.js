import React from "react";
import { Col } from "react-bootstrap";

import "./styles.css";

const CardContent = (props) => {
  const { cardContent } = props;

  const contentArrayData = [];

  for (const [key, value] of Object.entries(cardContent)) {
    const renderContent = (
      <Col md={12} key={key}>
        <div className={key}>{value}</div>
      </Col>
    );

    contentArrayData.push(renderContent);
  }

  return contentArrayData;
};

export default CardContent;
