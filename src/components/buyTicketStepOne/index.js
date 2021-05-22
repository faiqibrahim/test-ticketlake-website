// Library
import React from 'react';

const buyTicketStepOne = (props) => {
    let {isStandard} = props;
    return (

        <>
            <h4 style={{textAlign: 'left', textIndent: '15px', fontSize: '20px', float: 'left'}}>Tickets
                ({props.eventTime})</h4>
            <div className='table-responsive' style={{padding: '15px'}}>
                <table className='table table-borderless customTable'>
                    <thead>
                    <tr>
                        <th>Class</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Qty.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.ticketClasses}
                    </tbody>
                </table>
            </div>


            {!isStandard ?
                <>
                    <h4 style={{textAlign: 'left', textIndent: '15px', fontSize: '20px', float: 'left'}}>Pass
                        ({props.eventTime})</h4>
                    <div className='table-responsive' style={{padding: '15px'}}>
                        <table className='table table-borderless customTable'>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Class</th>
                                <th>Price</th>
                                <th>Available</th>
                                <th>Qty.</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.passClasses}
                            </tbody>
                        </table>
                    </div>
                </>
                : null
            }
        </>
    );
};


export default buyTicketStepOne;