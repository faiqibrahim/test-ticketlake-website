import React from "react";
import { withRouter } from "react-router-dom";
import ToolTips from "../../ToolTips/ToolTips";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked, nomineeCount } = props;

  const categoryName = (
    <ToolTips
      text={name}
      textLength={22}
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
        <div>
          {categoryName}--{nomineeCount}
        </div>
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
