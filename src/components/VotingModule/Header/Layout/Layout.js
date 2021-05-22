import React from 'react';
import { withRouter } from "react-router-dom";

import BreadCrumb from '../BreadCrumb/BreadCrumb';

import classes from './Layout.module.css';

const Layout = (props) => {

    return (
        <div className={classes.votingHeader}>
            <h1 className={classes.pageTitle}>{props.pageTitle}</h1>
            <div className={classes.votingBreadcrumbs}>
                <BreadCrumb {...props} />
            </div>
        </div>
    );
}

export default withRouter(Layout);