// Library
import React from "react";
import { NavLink } from "react-router-dom";

const error = (props) => {
  return (
    <div id="wrapper">
      <div className="content">
        <section className="color-bg parallax-section">
          <div className="city-bg" />
          <div className="cloud-anim cloud-anim-bottom x1">
            <i className="fal fa-cloud" />
          </div>
          <div className="cloud-anim cloud-anim-top x2">
            <i className="fal fa-cloud" />
          </div>
          <div className="overlay op1 color3-bg" />
          <div className="container">
            <div className="error-wrap">
              <h2>404</h2>
              <h5 style={{ color: "#fff" }}>
                {props.message ? props.message.toString() : "Page Not Found!"}
              </h5>
              <div className="clearfix" />
              <div className="clearfix" />

              <NavLink to="/" className="btn color2-bg flat-btn">
                Back to Home Page
                <i className="fas fa-home" />
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default error;
