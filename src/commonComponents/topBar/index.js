// Library
import React from 'react';

const topBar = (props) => {
    return (
        <div className={'col-lg-12'}>
            <div className={'row'}>
                <div className={'col-lg-2'}>
                    <img src="/images/mtn.svg" alt='img' style={{width: '73px'}}/>
                </div>
                <div className={'col-lg-10'} style={{padding: '22px 0px'}}>
                    <h4 style={{textAlign: 'left', fontSize: '20px', float: 'left'}}>
                        MTN Mobile Number
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default topBar;