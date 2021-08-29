import React from "react";
import "../../css/cardWithHoverEffect.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatCurrency } from "../../utils/common-utils";

let tabCards = [];

class CardWithHoverAnimation extends React.Component {
  state = {
    playVideo: false,
    onPlayHideBtn: false,
    playVideoWithIndexes: [],
    youtubeVideoId: null,
    playTrailerOnMouseHover: false,
    cards: [],
    selectedCard: -1,
    onHover: false,
  };

  componentDidMount() {
    if (this.props.cards) {
      this.setState({ cards: this.props.cards });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.tabCards && nextProps.tabCards.length > 0) {
      tabCards = nextProps.tabCards;
      return true;
    } else if (nextProps.cards && nextProps.cards.length > 0) {
      return true;
    } else {
      tabCards = [];
      return true;
    }
  }

  playVideoTrailer = (index, youtubeUrl) => {
    let array = [];
    array.push(index);
    let youtubeVideoId = "";
    if (youtubeUrl) {
      let video_id = youtubeUrl.split("v=")[1];
      if (video_id === undefined) {
        youtubeVideoId = "";
      } else {
        let ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        youtubeVideoId = video_id;
      }
    }
    this.setState({
      onPlayHideBtn: !this.state.onPlayHideBtn,
      playVideoWithIndexes: array,
      youtubeVideoId: youtubeVideoId,
    });
  };

  onMovieCardClick = (card) => {
    sessionStorage.setItem("parentEventDetail", JSON.stringify(card));
    if (card && card._id) {
      this.props.history.push({
        pathname: `/movie/detail/${card._id}`,
        data: card,
      });
    }
  };

  onMouseOver = (e, youtubeVideoId) => {
    e.preventDefault();
    if (youtubeVideoId) {
      this.setState({ playTrailerOnMouseHover: true });
    }
  };

  onMouseOut = (e, youtubeVideoId) => {
    e.preventDefault();
    if (youtubeVideoId) {
      this.setState({
        playTrailerOnMouseHover: false,
        playVideoWithIndexes: [],
      });
    }
  };

  render() {
    const { cards } = this.state;
    const { firstBtnTitle, secondBtnTitle } = this.props;

    const getAnimatedCard = (
      index,
      imageUrl,
      title,
      card,
      youtubeUrl,
      playVideoTrailer,
      playVideoWithIndexes,
      eventMaximumTicketClassPrice,
      eventMinimumTicketClassPrice
    ) => {
      let youtubeVideoId;
      if (youtubeUrl) {
        let video_id = youtubeUrl.split("v=")[1];
        if (video_id === undefined) {
          youtubeVideoId = "";
        } else {
          let ampersandPosition = video_id.indexOf("&");
          if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          youtubeVideoId = video_id;
        }
      }

      const { currency } = card;
      return (
        <div className="hover-card-wrp col-md-3" key={index}>
          <div
            className={"card-thumbnail"}
            onMouseEnter={(e) => this.onMouseOver(e, youtubeVideoId)}
            onMouseLeave={(e) => this.onMouseOut(e, youtubeVideoId)}
          >
            <img src={imageUrl} alt="eventImage" />
            <span
              className={`overlay-content ${
                playVideoWithIndexes && playVideoWithIndexes.includes(index)
                  ? "hide-play-btn"
                  : ""
              }`}
            >
              <div
                className={"overlay-on-select"}
                onClick={
                  card && card ? () => this.onMovieCardClick(card) : null
                }
              >
                <h5 className="overlay-movie-title">{title}</h5>
              </div>

              <span className="overlay-actions-btn">
                {youtubeUrl === undefined || youtubeUrl === null ? null : (
                  <button
                    className="simple-btn smallBtnWidth"
                    style={{ marginRight: "2%" }}
                    onClick={() => playVideoTrailer(index, youtubeUrl)}
                  >
                    <i className="fas fa-play" style={{ marginRight: "7px" }} />
                    {firstBtnTitle}
                  </button>
                )}
                <button
                  className="simple-btn largeBtnWidth"
                  onClick={
                    card && card ? () => this.onMovieCardClick(card) : null
                  }
                >
                  {eventMaximumTicketClassPrice
                    ? `${secondBtnTitle} from ${formatCurrency(
                        eventMinimumTicketClassPrice,
                        currency
                      )} - ${formatCurrency(
                        eventMaximumTicketClassPrice,
                        currency
                      )}`
                    : secondBtnTitle}
                </button>
              </span>
            </span>
            <span
              className={`video-hover-wrp ${
                playVideoWithIndexes && playVideoWithIndexes.includes(index)
                  ? "show-video-box"
                  : ""
              }`}
            >
              {this.state.playTrailerOnMouseHover ? (
                <>
                  <iframe
                    title="Player"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      this.state.youtubeVideoId
                    }?controls=0&amp;start=1;${
                      playVideoWithIndexes &&
                      playVideoWithIndexes.includes(index)
                        ? "autoplay=true"
                        : "autoplay=false"
                    }`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </>
              ) : null}
            </span>
          </div>
        </div>
      );
    };
    return (
      <>
        {cards && cards.length > 0 ? (
          <>
            {cards.map((card, index) => {
              let youtubeUrl = card.youtubeLink;
              let imageUrl =
                card.bannerImageKey && card.bannerImageKey.imageUrl;
              return getAnimatedCard(
                index,
                imageUrl,
                card.title,
                card,
                youtubeUrl,
                this.playVideoTrailer.bind(this),
                this.state.playVideoWithIndexes,
                card.eventMaximumTicketClassPrice,
                card.eventMinimumTicketClassPrice
              );
            })}
          </>
        ) : (
          <>
            {tabCards && tabCards.length > 0 ? (
              <>
                {tabCards &&
                  tabCards.map((card, index) => {
                    let youtubeUrl = card.youtubeLink;
                    let imageUrl =
                      card.bannerImageKey && card.bannerImageKey.imageUrl;
                    return getAnimatedCard(
                      index,
                      imageUrl,
                      card.title,
                      card,
                      youtubeUrl,
                      this.playVideoTrailer.bind(this),
                      this.state.playVideoWithIndexes,
                      card.eventMaximumTicketClassPrice,
                      card.eventMinimumTicketClassPrice
                    );
                  })}
              </>
            ) : (
              <div className={"Error-msg-wrp w100"}>
                <div className={"Error-heading"}>Sorry, No Data Found.</div>
                <span className={"Error-sub-heading"}>
                  There is no data found against this Category.
                </span>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

const connectedComponent = connect(null)(CardWithHoverAnimation);
export default withRouter(connectedComponent);
