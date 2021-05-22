import React from 'react';
import {NavLink} from "react-router-dom";

class BannerComponent extends React.Component {

    // Rendering Bread crumbs passed in props
    renderBreadCrumbs = () => {
        let {breadCrumbs} = this.props;
        let navCrumbs = [];


        let crumbsJSX = breadCrumbs.map((crumb, index) => {
            navCrumbs.push(crumb);
            if(index === breadCrumbs.length -1){
                return (
                    <span key={index} className={"last-crumb"}>{crumb.category.title}</span>
                )
            }
            let crumbsState = [...navCrumbs];
            return (
                <NavLink key={index} to={{
                    pathname: crumb.url,
                    state: {parentCategory: crumb.category, breadCrumbs: crumbsState}
                }}>{crumb.category.title}</NavLink>
            )
        });
        crumbsJSX.unshift(<NavLink key={breadCrumbs && breadCrumbs.length} glyph='home'
                                           to='/'>Home</NavLink>);

        return crumbsJSX;
    };

    render() {
        let props = this.props;
        return (
            <section className="list-single-hero" data-scrollax-parent="true" id="sec1">
                <div className="bg par-elem" style={{
                    float: 'left',
                    backgroundImage: "url('" + window.location.origin + props.image + "')",
                    translateY: '30%'
                }}/>
                <div className="list-single-hero-title fl-wrap">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="listing-rating-wrap">
                                    <div className="listing-rating card-popup-rainingvis"
                                         data-starrating2={5}/>
                                </div>
                                <h2>
                                    <span>{props.heading}</span>
                                    <p style={{
                                        fontSize: '16px',
                                        color: '#eae9e8',
                                        paddingBottom: 'unset',
                                        marginTop: '5px'
                                    }}>{props.para}</p>
                                </h2>
                            </div>
                        </div>



                        {/*<BreadcrumbsItem glyph='home' to='/'>Home</BreadcrumbsItem>*/}

                        {/*<BreadcrumbsItem to={'/movies'}>Movies</BreadcrumbsItem>*/}

                        {/*<BreadcrumbsItem to={'/value'}>Values</BreadcrumbsItem>*/}

                        <div className="breadcrumbs-hero-buttom fl-wrap">
                            <div className="breadcrumbs category-crumbs">
                                {/*<Breadcrumbs*/}
                                    {/*item={NavLink}*/}
                                    {/*finalItem={'span'}*/}
                                    {/*finalProps={{*/}
                                        {/*style: {color: 'red'}*/}
                                    {/*}}*/}
                                {/*/>*/}
                                {this.renderBreadCrumbs()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BannerComponent