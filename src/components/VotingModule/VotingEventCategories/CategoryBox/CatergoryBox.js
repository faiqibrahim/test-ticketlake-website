import React from "react";
import { withRouter } from "react-router-dom";
import ToolTips from "../../ToolTips/ToolTips";
import { Row, Col } from "reactstrap";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const {
    image,
    name,
    clicked,
    numberOfNominees,
    catalogue,
    selectedCategory,
    id,
  } = props;

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

  const nomineeCountDesign = catalogue ? (
    <>
      <Col md={12}>
        <span>{numberOfNominees}</span>
        <span>Nominees</span>
      </Col>
    </>
  ) : (
    <>
      <Col md={12}>{numberOfNominees}</Col>
      <Col md={12}>NOMINEES</Col>
    </>
  );

  const activeCategory = id === selectedCategory ? "activeCateogry" : "null";

  return (
    <div className={`CategoryBoxCol ${activeCategory}`} onClick={clicked}>
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
              <Row>{nomineeCountDesign}</Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
