import React from 'react';

const CardViewWithImgAndName = ({onClick, image, imgWidth, heading, description}) => {
    return(
        <div className='payment-selection row hubtel-payment'
             onClick={onClick}>
            <div className='col-md-12' style={{margin: 'auto 0px'}}>
                <img src={image} className={imgWidth} alt='img'/>
                <div>
                    <h6 style={{margin:"auto 0px"}}>
                        {heading}<br/>
                        <small style={{fontFamily:"Helvetica"}}>{description}</small>
                    </h6>
                </div>
            </div>
        </div>
    )
};

export default CardViewWithImgAndName;