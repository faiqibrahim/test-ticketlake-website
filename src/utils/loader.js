import React from "react";
import Loader from "react-loader-spinner";

const loader = (props) => {
  let _props = {
    type: "Puff",
    color: "red",
    height: "100px",
    width: "100px",
    ...props,
  };

  return (
    <div
      style={{
        textAlign: "center",
        verticalAlign: "center",
        width: "100%",
        marginTop: "150px",
        marginBottom: "150px",
      }}
    >
      <Loader {..._props} />
    </div>
  );
};

export default loader;
