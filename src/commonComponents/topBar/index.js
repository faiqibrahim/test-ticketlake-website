// Library
import React from 'react';

const topBar = (props) => {
    return (
        <div className={'col-lg-12'}>
            <div className={'row align-item'}>
                <div className={'col-lg-2'}>
                    <img src="/images/mtn-logos.png" alt='img' style={{width: '73px'}}/>
                </div>
                <div className={'col-lg-10'} style={{padding: '22px 0px'}}>
                    <h4 className={"mtn-numeber-heading"} style={{textAlign: 'left', fontSize: '20px', float: 'left'}}>
                        Mobile Money
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default topBar;