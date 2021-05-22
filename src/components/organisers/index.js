// Library
import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import Loader from "../../commonComponents/loader";
import { Select } from 'antd';
import axios from "../../utils/axios";


const { Option } = Select;

class Organisers extends Component {

    state = {
        orgData:[],
        baseData:[],
        loadOrgData: false,
        countries:[],
        orgDataFilter:[],
        totalCountries:0
    };
    handleCountryChange = (value) => {
        let orgDataFilter = _.map(this.state.baseData, function(o) {
            if (o.address.country === value) return o;
        });
        
        orgDataFilter = _.without(orgDataFilter, undefined)

        this.setState({
            orgData: orgDataFilter
        })
        if(value==='All'){
            this.setState({
                orgData: this.state.baseData
            })
        }
      }

    componentDidMount=()=>{
        axios.get('/organizations/get-organizations')
        .then(response => {
            console.log("response: organisaton", response.data.data)
            let getCountries = []
            // getCountries.push({address:{country:'All'}})
            getCountries.unshift('All')
            
            // let getCountriesUnique = _.uniq(_.map(res, 'address.country'))
            let getCountriesUnique = _.uniq(getCountries)
            getCountries.push(getCountriesUnique)

            this.setState({
                orgData:response.data.data,
                baseData:response.data.data,
                countries:getCountries,
                loadOrgData: response.data.data,
                totalCountries: getCountriesUnique
            })
        })
        .catch(err => {
            console.error("Err:", err)
        })
    }

    render() {
        const hrefLink = '#';
            return (
                <>
                    <div id="wrapper">
                        <div className="content">
                        {this.state.loadOrgData?
                            <>
                                <section className="list-single-hero organiser-sec" data-scrollax-parent="true" id="sec1" style={{marginBottom:'50px', zIndex:'90'}}>
                                    <div className="bg par-elem" style={{
                                        float: 'left',
                                        backgroundImage: "url('images/org_banner.png')",
                                        translateY: '30%'
                                    }}/>
                                    <div className="list-single-hero-title fl-wrap remove-padding">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="listing-rating-wrap">
                                                        <div className="listing-rating card-popup-rainingvis"
                                                            data-starrating2={5}/>
                                                    </div>
                                                    <div className="title-new-padding">
                                                        <h2 style={{marginBottom:'0'}}>
                                                            <span>Ticketlake - All Things Ticket</span>
                                                        </h2>
                                                        <p style={{textAlign:'left', color:'#ffffff', paddingBottom:'20px',fontSize: '24px', fontWeight: 100}}>
                                                            Get tickets of
                                                            <span style={{color:'red', textDecoration:'underline',marginLeft:"5px"}}>
                                                                {_.sumBy(this.state.orgData, 'eventCount')} Events
                                                            </span> happening in
                                                            <span style={{color:'red', textDecoration:'underline',marginLeft:"5px"}}>
                                                                {this.state.totalCountries.length-1} countries!
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <a className="btn btn-danger buttonDefault defaultBackground" href={hrefLink} style={{width: '100%', textAlign: 'left', maxWidth:'200px', float:'left', zoom: 1.3,}}>
                                                                Ticketlake Events
                                                                <i class="fa fa-long-arrow-alt-right" style={{background:'none', borderLeft:'0px', right:'unset', color:'#fff', fontSize:'20px'}}></i>
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <BreadcrumbsItem glyph='home' to='/'>Home</BreadcrumbsItem>
                                            <BreadcrumbsItem to='/organisers'>
                                                Event Organisers
                                            </BreadcrumbsItem>

                                            <div className="breadcrumbs-hero-buttom fl-wrap">
                                                <div className="breadcrumbs">
                                                    <Breadcrumbs
                                                        item={NavLink}
                                                        finalItem={'span'}
                                                        finalProps={{
                                                            style: {color: '#EC1C24'}
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="container">
                                    <div className="row left">
                                        <div className="col-md-8 section-title mb0">
                                            <h2>Event Organisers</h2>
                                            <span style={{height: '4px', width: '60px', background: 'lightgrey', float: 'left', borderRadius: '2px', margin: '10px 0px'}}></span>
                                            {/* <div className="org-border"></div> */}
                                            <p style={{display: 'inline-block', width: '100%', fontWeight: 'bold'}}>Get tickets of {_.sumBy(this.state.orgData, 'eventCount')} Events happening in {this.state.totalCountries.length-1} countries!</p>
                                        </div>
                                        <div className="col-md-4">
                                            <Select defaultValue="All" className="org-select" style={{ width: 250, float:'right' }} onChange={this.handleCountryChange}>
                                                {this.state.totalCountries.map(dat =>{
                                                    return(
                                                    <Option value={dat}>{dat!=='All'?<img alt='img' src="/images/ghana_flag.svg" className="org-select-img"/>:null}{dat}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mb-100">
                                        <div className="row organiser-row">
                                            {this.state.loadOrgData?
                                                this.state.orgData.map(data => {
                                                    return (
                                                        <div className="organiser-box">
                                                            <div className="card-with-border">
                                                                <img className="card-img" alt='img'
                                                                    src={data.imageURL!==undefined?
                                                                        data.imageURL.length!==0 ?
                                                                            data.imageURL
                                                                            :
                                                                            "images/placeholder.jpg"
                                                                        :
                                                                        "images/placeholder.jpg"
                                                                    }
                                                                />
                                                                <div style={{padding:"20px"}} className={"organiser-card-wrp"}>
                                                                    <p className="card-heading">{data.name}</p>
                                                                    <p className="card-paragraph">{data.address.city}, {data.address.country}</p>
                                                                    <p className="card-link">{data.eventCount}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            :
                                            <Loader/>
                                            }
                                            
                                        </div>
                                    </div>
                            </>
                            :
                            <Loader/>
                            }
                        </div>
                    </div>
                </>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
};
const connectedComponent = connect(mapStateToProps, {

})(Organisers);
export default withRouter(connectedComponent);