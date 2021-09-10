import React from "react";
const EventMessage = (props) => {
    const {heading, subHeading } = props;
    return (
        <div className={"Error-msg-wrp w100"}>
            <div className={"Error-heading"}>{heading || "Sorry, No Event Found."}</div>
            <span className={"Error-sub-heading"}>{subHeading || "There are no events."}</span>
        </div>
    )

}
export default EventMessage;
