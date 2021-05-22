import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

class CardComponent extends React.Component{

    state = {
        arrow : false
    };

    render(){

        const showDetail = () => {
            this.setState({arrow:true})
        };

        const closeDetail = () => {
            this.setState({arrow:false})
        };

        const {onClick} = this.props;
        const hrefVal = "#";
        return (
            <div className="listing-item" style={{width:'100%'}}>
                <article className="geodir-category-listing fl-wrap">
                    <div className="geodir-category-img">
                        <a href={hrefVal} onClick={onClick}>
                            <img src={this.props.data.celebrityImageKey.imageUrl ? this.props.data.celebrityImageKey.imageUrl : window.location.origin + '/images/city/1.jpg'}  alt={"img"} style={{height: '220px'}}/>
                        </a>
                    </div>
                    <div className="geodir-category-content fl-wrap title-sin_item" style={{paddingRight:'20px'}}>
                        <div className="geodir-category-content-title fl-wrap">
                            <div className="geodir-category-content-title-item">
                                <h3 className="title-sin_map speakers-heading" style={{fontSize:'18px',marginBottom:'5px'}}>
                                    <a href={hrefVal} onClick={onClick}>
                                        {this.props.data.celebrityName ? this.props.data.celebrityName : "Celebrity Name"}
                                    </a>
                                </h3>
                                {
                                    this.state.arrow === false ?
                                        <i className="fa fa-angle-down fa-arrow"
                                           onClick={showDetail}
                                           style={{float:'right',marginRight:'12px',marginLeft:'0px'}}/> : null
                                }

                                {
                                    this.state.arrow === true ?
                                        <i className="fa fa-angle-up fa-arrow"
                                           onClick={closeDetail}
                                           style={{float:'right',marginRight:'12px',marginLeft:'0px'}}/> : null
                                }
                                <div className="geodir-category-location fl-wrap" style={{marginBottom: '0px'}}>
                                    <a href={hrefVal} className="map-item" style={{color: '#5A5A5A',fontSize: '12px',fontWeight:'normal',width: '270px',whiteSpace:'nowrap',overflow: 'hidden',textOverflow:'ellipsis'}}>
                                        {this.props.data.celebrityTitle ? this.props.data.celebrityTitle : "Celebrity Title"}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <p style={{marginTop:'8px',float:'left',width:'100%;',color:'#999',lineHeight:'20px',marginBottom:'0px',paddingBottom:'0px'}}>
                            <LinesEllipsis
                                text={this.props.data.celebrityDescription? this.props.data.celebrityDescription : "Celebrity Description"}
                                maxLine={this.state.arrow === true ? '40' : '3'}
                                ellipsis=' . . .'
                                trimRight
                                basedOn='letters'
                            />
                        </p>

                    </div>
                </article>
            </div>
        )
    }
}


export default CardComponent;