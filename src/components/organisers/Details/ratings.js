import React from "react";
import { Rate } from "antd";
import classes from "./style.module.css";

const Ratings = ({ handleToggle }) => {
  return (
    <div className="container">
      <p className={classes.ratingheading}>Share your review and rating</p>
      <input
        type="text"
        placeholder="Name"
        className={classes.customInputname}
      />
      <textarea
        placeholder="Add a comment…"
        rows="10"
        className={classes.customTextArea}
      />
      <label className={`d-flex justify-content-center ${classes.customlabel}`}>
        {" "}
        <Rate allowHalf defaultValue={0} />
      </label>
      <button
        onClick={() => (handleToggle ? handleToggle() : null)}
        className={classes.postBtn}
      >
        Post
      </button>
    </div>
  );
};

export default Ratings;
