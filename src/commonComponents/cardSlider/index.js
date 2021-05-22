// Library
import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class CardSlider extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    render() {
        let {settings} = this.props;
        const propsSettings = {
            dots: this.props.settings.dots,
            infinite: this.props.settings.infinite,
            speed: this.props.settings.speed,
            slidesToShow: this.props.settings.slidesToShow,
            slidesToScroll: this.props.settings.slidesToScroll,
            initialSlide: this.props.settings.initialSlide,
            autoplay: this.props.settings.autoplay,
            autoplaySpeed: this.props.settings.autoplaySpeed,
            cssEase: this.props.settings.cssEase,
            focusOnSelect: this.props.settings.focusOnSelect,
            className: this.props.settings.className,
            centerMode: this.props.settings.centerMode,
            centerPadding: this.props.settings.centerPadding,
            arrows: this.props.settings.arrows,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        if(!settings.isUpcoming && !settings.isCategory){
            propsSettings.responsive.push( {
                    breakpoint: 2400,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 1367,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                })
        }else if(settings.isCategory){
            propsSettings.responsive.push(
                {
                    breakpoint: 2400,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 1368,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                },
                {
                    breakpoint: 1263,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: settings.infinite,
                        dots: true
                    }
                })
        }

        return (
            <div>
                <Slider ref={c => (this.slider = c)}  {...propsSettings}>
                    {this.props.children}
                </Slider>
                {this.props.buttons.display ? (
                    <div>
                        <div className={this.props.buttons.mainPreviousClass} onClick={this.previous}>
                            <i className={this.props.buttons.previousIcon}/>
                        </div>
                        <div className={this.props.buttons.mainNextClass} onClick={this.next}>
                            <i className={this.props.buttons.nextIcon}/>
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }
}
