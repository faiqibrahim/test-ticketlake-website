import React from 'react';

const styles = {
    wrap: {
        padding: '40px 0px',
        textAlign: 'left'
    },
    title: {
        margin: '8px 0px 12px 0px'
    }
};

const cardWithSideDetails = (props) => {
    let {image, title, categories, startDate, endDate, onClickWrp, data} = props;

    return (

        <div className='row' style={styles.wrap}>
            <div className="col-md-3 sideDetailCard-img">
                <img src={image ? image : '/images/card_3.png'} alt='img'
                     onClick={() => onClickWrp(data)}/>
            </div>
            <div className="col-md-8 nearby-text">
                <h5 style={styles.title}  onClick={() => onClickWrp(data)} >{title ? title : 'Title'}</h5>
                <p>{categories}<br/>
                    {startDate} - {endDate} <br/>
                    {/*{shows ? shows : 0} Shows*/}
                </p>
            </div>
        </div>
    )
};

export default cardWithSideDetails;