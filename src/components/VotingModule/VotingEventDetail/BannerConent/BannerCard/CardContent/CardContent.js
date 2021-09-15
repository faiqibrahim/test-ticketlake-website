import React from "react";
import { Col } from "react-bootstrap";

import "./styles.css";

const CardContent = (props) => {
  const { cardContent } = props;

  const contentArrayData = [];

  for (const [key, value] of Object.entries(cardContent)) {
    const renderContent = (
      <Col sm={12} key={key} className={`${key}Col`}>
        <div className={key} dangerouslySetInnerHTML={{ __html: value }} />
      </Col>
    );

    contentArrayData.push(renderContent);
  }

  return contentArrayData;
};

export default CardContent;
