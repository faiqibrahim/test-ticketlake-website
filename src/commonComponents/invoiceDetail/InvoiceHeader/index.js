import React from "react";

const InvoiceHeader = (props) => {
  const { heading, children } = props;
  return (
    <div className="col-md-12">
      <p className="str">
        {heading && <strong>{heading}</strong>}
        {children && children}
      </p>
    </div>
  );
};

export default InvoiceHeader;
