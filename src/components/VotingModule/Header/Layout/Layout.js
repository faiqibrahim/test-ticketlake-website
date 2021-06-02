import React from 'react';
import { withRouter } from "react-router-dom";

import BreadCrumb from '../BreadCrumb/BreadCrumb';

import './Layout.css';

const Layout = (props) => {

    return (
        <div className="votingHeader">
            <h1 className="pageTitle">{props.pageTitle}</h1>
            <div className="votingBreadcrumbs">
                <BreadCrumb {...props} />
            </div>
        </div>
    );
}

export default withRouter(Layout);