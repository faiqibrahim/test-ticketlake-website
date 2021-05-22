// Library
import React from 'react';

const styles = {
    wrap: {

    },
    title: {
        color: '#494949',
        fontSize: '17px',
        marginTop: '17px'
    },
    subTitle: {
        color: '#747A95',
        fontSize: '14px'
    }
};

class MovieCategories extends React.Component {
    render() {
        let {imageUrl, title, subTitle, key} = this.props;
        let backImgURL = imageUrl? `url(${imageUrl})` : `url(http://localhost:3000/images/card_3.png)`;
        backImgURL = `linear-gradient(0deg,rgba(0,0,0,0), rgba(0,0,0,0.8)), ${backImgURL}`;
        let categoryClass = `geodir-category-img card-post widthHeightSmall img-category-div`;

        return (
            <div key={key} className={'slick-slide-item category-slider-item'}
                 style={{width: "100%"}}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <div className={categoryClass} style={{backgroundImage: backImgURL, cursor: 'initial'}}>
                        </div>
                    </div>
                    <div className={'col-md-12'} style={styles.title}>
                        {title ? title : 'Name Here'}
                    </div>
                    <div className={'col-md-12'} style={styles.subTitle}>
                        {subTitle ? subTitle : 'Sub Title'}
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCategories;