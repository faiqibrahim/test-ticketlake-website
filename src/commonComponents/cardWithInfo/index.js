// Library
import React from 'react';

const CardWithInfo = (props) => {
    let {imageSrc, title, categoriesArr, smallBtn, largeBtn, smallBtnAction,
        youtubeVideoId, onClickWrp, data} = props;
    return (
        <>
            <img src={imageSrc} alt="BannerImage" style={{width: "100%", height: "100%"}}/>
            <div className={`text-at-bottom align-left`}>
                <div className="bold-title cursor-pointer" onClick={() => onClickWrp(data)} >
                    {title && title}
                </div>
                <div className="light-weight-text">
                    {categoriesArr && categoriesArr.map((category, i) => {
                        return (
                            <span key={i}>
                                {category.title}{i === categoriesArr.length - 1 ? " " : i === categoriesArr.length - 2 ? " & " : ", "}
                            </span>
                        )
                    })}
                </div>
                <div className={"row"}>
                    <div className={"col-md-12 button-wrp"}>
                        {(youtubeVideoId === undefined) || (youtubeVideoId === null) ?
                            null :
                            <button className='simpleButton'
                                    style={{marginRight: '2%'}}
                                    onClick={() => smallBtnAction(youtubeVideoId)}>
                                <i className="fas fa-play" style={{marginRight: '7px'}}/>
                                {smallBtn && smallBtn}
                            </button>
                        }
                        <button className='simpleButton'
                                onClick={() => onClickWrp(data)}>
                            {largeBtn && largeBtn}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardWithInfo;