import React from "react";
import { withRouter } from "react-router-dom";
import ToolTips from "../../ToolTips/ToolTips";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked } = props;

  const categoryName = (
    <ToolTips
      text={name}
      classes={{
        toolStyle: "tooltipStyle",
        textClasses: {
          title: image ? "boxTitle" : "boxTitleNoImage",
          overlayTool: image ? "votingOverlay" : "votingOverlayNoImage",
        },
      }}
    />
  );

  return (
    <div className="CategoryBoxCol" onClick={clicked}>
      <div
        className="boxContent"
        style={image ? { backgroundImage: `url('${image}')` } : null}
      >
        {categoryName}
      </div>
    </div>
  );
};

export default withRouter(CatergoryBox);
