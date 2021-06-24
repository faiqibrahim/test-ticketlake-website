import React from "react";

const style = {
    outerDiv: {
        position: 'relative',
        backgroundColor: '#303030',
        height: '184px',
        borderRadius: '12px',
        width: '282px',
        maxWidth: '600px',
        overflow: 'hidden',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',
        transition: 'height 0.3s, box-shadow 0.3s'
    },
    image: {
        position: 'absolute',
        left: '-9999px',
        right: '-9999px',
        margin: 'auto',
        height: '100%',
        minWidth: '100%'
    }
};

const CardWithBottomTitle = (props) => {
    let {image, title, onClickWrp, data} = props;

    return (
        <div className={'col-md-2'} style={{marginBottom: '40px', cursor : "pointer",marginRight : "50px"}}>
            <div key={'1'}
                 style={style.outerDiv}>
                <img style={style.image} alt='img'
                     src={image ? image : '/images/card_3.png'}
                     onClick={() => onClickWrp(data)}/>
            </div>
            <div className={'bottom-title'}  onClick={() => onClickWrp(data)}
                 style={{cursor : "pointer"}}
            >
                {title? title : 'Title'}
            </div>
        </div>
    )
};

export default CardWithBottomTitle;