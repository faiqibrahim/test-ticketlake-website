// Library
import React from 'react';

const sectionCard = (props) => {
    let backImgURL = props.img?`url(${props.img})`:`url(http://localhost:3000/images/card_3.png)`;
    return (
        <div className="slick-slide-item" style={{width: "100%"}}>
                <div className="geodir-category-img card-post img-category-div" style={{backgroundImage:`${backImgURL}`}}>
                    <div className="geodir-category-opt">
                        <div className={"col-md-12"} style={{padding: '0px'}}>
                            <h3 style={{marginBottom: '35px', color: "white", fontSize: "16px", fontWeight: "600"}}>
                                {props.title ? props.title : "Title"}
                            </h3>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default sectionCard;