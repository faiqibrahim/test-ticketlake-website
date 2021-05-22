import React from 'react';
import {UncontrolledTooltip} from "reactstrap";

const ToolTip = ({isOpen, target, toggle, value}) => {
    return(
        <UncontrolledTooltip
            isOpen={isOpen}
            placement="top"
            target={target}
            toggle={toggle}
        >
            {value}
        </UncontrolledTooltip>
    )
};

export default ToolTip;