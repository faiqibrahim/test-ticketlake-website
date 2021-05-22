import React from 'react';

const style = {
    wrapper: {
        position: 'relative',
        backgroundColor: '#303030',
        height: '182px',
        borderRadius: '12px',
        width: '278px',
        overflow: 'hidden',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',
        transition: 'height 0.3s, box-shadow 0.3s'
    },
    bottomTitle: {
        fontWeight: 700,
        fontSize: '22px',
        color: 'black',
        textAlign: 'start',
        marginTop: '12px'
    },
    info: {
        color: '#878C9F',
        textAlign: 'start',
        fontSize: '16px',
        fontWeight: 500
    }
};

const CardWithBottomInfo = ({imageSrc, title, address, noOfShows, distance, onClick}) => {
    return (
        <div className={'row cursor-pointer'} style={{width: '330px', marginBottom: '6%'}} onClick={onClick}>
            <div className={'col-md-12'}>
                <div style={style.wrapper}>
                    <img alt='img' className={'animated-card-image'}
                         src={imageSrc ? imageSrc : '/images/card_2.png'}/>
                </div>
            </div>
            <div className={'col-md-12'}>
                <div className={'row'}>
                    <div className={'col-md-8'}>
                        <div style={style.bottomTitle}>
                            {title}
                        </div>
                    </div>
                    <div className={'col-md-3'} style={{textAlign: 'right'}}>
                        <div style={{marginTop: '12px', display: 'grid'}}>
                            <span style={{fontSize: '22px', fontWeight: 700, marginBottom: '-3px', color: 'black'}}>{distance}</span>
                            <span style={{fontSize: '10px', fontWeight: 500, color: '#878C9F'}}>KM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'col-md-12'} style={{marginTop: '-8px'}}>
                <div style={style.info}>{noOfShows} Shows</div>
            </div>
            <div className={'col-md-12'} style={{marginTop: '-4px'}}>
                <p style={style.info}>{address}</p>
            </div>
        </div>
    )
};

export default CardWithBottomInfo;