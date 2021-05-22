import React from 'react';

export const GetBulletWrapView = ({bulletVal, heading, children}) => {
    return(
        <div className={'row bullet-wrap'}>
            <span className={'col-md-1 bullet-num'}>{bulletVal}</span>
            <span className={'col-md-10'}>
                <span className={'underline'}><b>{heading}</b></span>
                {children}
            </span>
        </div>
    )
};

export const GetBulletInnerData = ({value, children}) => {
    return(
        <div className={'row rowStyle'}>
            <div className={'col-md-2 offset-3'}>
                <span className={'underline'}>{value}</span>
            </div>
            <div className={'col-md-6'}>
                {children}
            </div>
        </div>
    )
};
