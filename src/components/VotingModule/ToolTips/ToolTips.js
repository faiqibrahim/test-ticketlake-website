import React from "react";
import ReactTooltip from "react-tooltip";

const ToolTips = (props) => {
  const { text, classes, textLength } = props;

  const toolTipText =
    text.length > textLength ? (
      <>
        <div className={classes.textClasses.title} data-tip={text}>
          {text}
        </div>
        <div className={classes.textClasses.overlayTool}></div>
        <ReactTooltip place="right" className={classes.toolStyle} />
      </>
    ) : (
      <>
        <div className={classes.textClasses.title}>{text}</div>
        <div className={classes.textClasses.overlayTool}></div>
      </>
    );

  return toolTipText;
};

export default ToolTips;
