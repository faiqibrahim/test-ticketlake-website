import React from "react";
import { withRouter } from "react-router-dom";
import ToolTips from "../../ToolTips/ToolTips";
import { Row, Col } from "reactstrap";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked, numberOfNominees } = props;

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
            <Col md={8} className="categoryNameTime col-8">
              {categoryName}
            </Col>
            <Col md={4} className="categoryNomineeCount col-4">
              <span>NOMINEES</span> <span>{numberOfNominees}</span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
