// Library
import React from 'react';

const buyTicketStepThree = (props) => {
    return (
        <div className="bookiing-form-wrap">
            <div className="list-single-main-item fl-wrap hidden-section tr-sec">
                <div className="profile-edit-container">
                    <div className="custom-form">
                        <fieldset className="fl-wrap">
                            <div className="list-single-main-item-title">
                                <h3>Confirmation</h3>
                            </div>
                            <div className="success-table-container">
                                {props.confirmation ? (
                                        <>
                                            <div className="success-table-header fl-wrap">
                                                <i className="fa fa-check-circle decsth"/>
                                                <h4>Thank you. Your reservation has been received.</h4>
                                                <div className="clearfix"/>
                                                <p>Your payment has been processed successfully.</p>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <div className="success-table-header fl-wrap">
                                            <i className="fa fa-times-circle decsth" style={{color: '#cf5e5e'}}/>
                                            <h4>Failed to get the payment</h4>
                                            <div className="clearfix"/>
                                        </div>
                                    )
                                }

                            </div>
                        </fieldset>
                        {/*<NavLink to={'/events/listing'} className='checkoutButton'>*/}
                        {/*    All Events*/}
                        {/*</NavLink>*/}
                    </div>
                </div>
            </div>
        </div>

    )
};

export default buyTicketStepThree;