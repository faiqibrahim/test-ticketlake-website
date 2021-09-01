import React from "react";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import "./CatergoryBox.css";

const CatergoryBox = (props) => {
  const { image, name, clicked } = props;

  const categoryName =
    name.length > 21 ? (
      <>
        <div className={image ? "boxTitle" : "boxTitleNoImage"} data-tip={name}>
          {name}
        </div>
        <div className={image ? "votingOverlay" : "votingOverlayNoImage"}></div>
        <ReactTooltip place="right" className={"tooltipStyle"} />
      </>
    ) : (
      <>
        <div className={image ? "boxTitle" : "boxTitleNoImage"}>{name}</div>
        <div className={image ? "votingOverlay" : "votingOverlayNoImage"}></div>
      </>
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
