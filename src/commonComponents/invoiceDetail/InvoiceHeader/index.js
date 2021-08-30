import React from "react";

const InvoiceHeader = (props) => {
  const { heading, children } = props;
  return (
    <div className="col-md-12">
      <p className="str">
        <strong>{heading}</strong>
        <br />
        {children && children}
      </p>
    </div>
  );
};

export default InvoiceHeader;
