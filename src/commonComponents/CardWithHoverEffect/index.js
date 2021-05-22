// Library
import React from 'react';

export const CardWithHoverEffect = ({index,firstBtnTitle,secondBtnTitle,imageUrl,title,
                                        playVideoWithIndexes  ,youtubeVideoId , onMouseEnter , onMouseLeave , card,
                                        playVideoTrailer , onMovieCardClick , youtubeUrl ,
                                        playTrailerOnMouseHover,stateYoutubeVideoId
                                    }) => {
    return (
        <div className="hover-card-wrp col-md-3 mb-30" id={index}>
            <div className={'card-thumbnail'}
                 onMouseEnter={(e) => onMouseEnter(e, youtubeVideoId)} onMouseLeave={(e) => onMouseLeave(e, youtubeVideoId)}
            >
                <img src={imageUrl} alt="img"/>
                <span className={`overlay-content ${playVideoWithIndexes && playVideoWithIndexes.includes(index) ? "hide-play-btn" : ""}`}>
                    <div className={'overlay-on-select'}
                         onClick={card && card ? () => onMovieCardClick(card) : null}>
                        <h5 className="overlay-movie-title">
                            {title}
                        </h5>
                    </div>
                    <span className="overlay-actions-btn">
                        {
                            (youtubeUrl === undefined) || (youtubeUrl === null) ? null :
                                <button className='simple-btn smallBtnWidth' style={{marginRight: '2%'}}
                                        onClick={() => playVideoTrailer(index, youtubeUrl)}
                                >
                                    <i className="fas fa-play" style={{marginRight: '7px'}}/>
                                    {firstBtnTitle}
                                </button>
                        }
                        <button className='simple-btn largeBtnWidth'
                                onClick={card && card ? () => onMovieCardClick(card) : null}
                        >
                            {secondBtnTitle}
                        </button>
                    </span>
                </span>
                <span className={`video-hover-wrp ${playVideoWithIndexes && playVideoWithIndexes.includes(index) ? "show-video-box" : ""}`}>
                    {
                        playTrailerOnMouseHover ?
                            <>
                                <iframe title="Player" width="560" height="315"
                                        src={`https://www.youtube.com/embed/${stateYoutubeVideoId}?controls=0&amp;start=1;${playVideoWithIndexes && playVideoWithIndexes.includes(index) ? 'autoplay=true' : 'autoplay=false'}`}
                                        frameBorder="0"
                                        allowFullScreen/>
                            </>
                            : null
                    }
                </span>
            </div>
        </div>
    );
};
