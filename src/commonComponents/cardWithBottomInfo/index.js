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
        fontSize: '20px',
        color: 'black',
        textAlign: 'start',
        marginTop: '12px'
    },
    info: {
        color: '#878C9F',
        textAlign: 'start',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom:'0px'
    }
};

const CardWithBottomInfo = (props) => {
    const {imageSrc, title, address, noOfShows, distance, onClick,dates,country,venueTitle} = props;
    return (
        <div className={'nearby-box-wrp cursor-pointer'} onClick={onClick}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div style={style.wrapper}>
                        <img alt='img' className={'animated-card-image'}
                             src={imageSrc ? imageSrc : '/images/card_2.png'}/>
                    </div>
                </div>
            </div>
            <div className={'row'}>
                {
                    title ? <div className={'col-md-8'}>
                        <div style={style.bottomTitle}>
                            {title}
                        </div>
                    </div>:null
                }
                {
                    distance ? <div className={'col-md-4'} style={{textAlign: 'right'}}>
                        <div style={{marginTop: '12px', display: 'grid'}}>
                            <span style={{fontSize: '20px', fontWeight: 700, marginBottom: '-3px', color: 'black'}}>{distance}</span>
                            <span style={{fontSize: '10px', fontWeight: 500, color: '#878C9F'}}>KM</span>
                        </div>
                    </div>:null
                }

            </div>
            <div className={`${dates ? 'padding-top'  : ''} row` } >
                <div className={'col-md-12'}>
                    <div style={style.info}>{noOfShows? noOfShows + " Shows": dates} </div>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <p style={style.info}>{address ? address + "," + country : venueTitle} </p>
                </div>
            </div>
        </div>
    )
};

export default CardWithBottomInfo;