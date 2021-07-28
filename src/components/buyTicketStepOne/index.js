// Library
import React from "react";
import ClassQuanityTable from "./ClassQuantityTable";

const buyTicketStepOne = (props) => {
  const { isStandard, ticketClasses, passClasses } = props;
  return (
    <React.Fragment>
      <ClassQuanityTable
        heading={"Tickets"}
        bodyContent={ticketClasses}
        {...props}
      />
      {!isStandard && (
        <ClassQuanityTable
          heading={"Passes"}
          bodyContent={passClasses}
          isPassView={!isStandard && passClasses && passClasses.length}
          {...props}
        />
      )}
    </React.Fragment>
  );
};

export default buyTicketStepOne;
