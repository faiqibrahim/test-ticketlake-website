import React from "react";
import { withRouter } from "react-router-dom";
import ToolTips from "../../ToolTips/ToolTips";
import { Row, Col } from "reactstrap";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked, nomineeCount } = props;

  const categoryName = (
    <ToolTips
      text={name}
      textLength={20}
      classes={{
        toolStyle: "tooltipStyle",
        textClasses: { title: "boxTitle" },
      }}
    />
  );

  return (
    <div className="CategoryBoxCol" onClick={clicked}>
      <div className="boxContent">
        <div className="categoryImage">
          <img src={image} alt="img" />
        </div>
        <div className="categoryMeta">
          <Row>
            <Col md={8} className="categoryNameTime">
              {categoryName}
            </Col>
            <Col md={4} className="categoryNomineeCount">
              <span>NOMINEES</span> <span>{nomineeCount}</span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
