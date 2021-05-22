import React, {Component,Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {getEventDetail} from '../../data-fetcher';
import VotingHeader from '../../Header/Layout/Layout';

import CategoryBox from '../CategoryBox/CatergoryBox';
import  './EventCategories.css';


class VotingEvent extends Component {

    state = {
        loading : true,
        event  : null
    }

    componentDidMount(){
            getEventDetail(this.props.match.params.id).then((event) =>{
                this.setState({
                    loading:false,
                    event,
                    breadCrumbs : [
                        { path :"/", crumbTitle:"Home"},
                        { path : '/voting' ,crumbTitle : 'Votings'},
                        { path : `/voting/${event.id}`, crumbTitle:event.eventTitle}
                    ]
                })
        }).catch((error) =>{
        })
    }
    

    categorySelectedHandler = (categoryId) => {

        this.props.history.push({
                pathname : this.props.location.pathname + "/categories/" + categoryId 
            }
        );
    }
    
    render(){
        if(this.state.loading) return <p>Component Loading!</p> 

        return(  
            <Fragment>
                <div className="container">
                    <div className="headerContainer">
                        <VotingHeader 
                            pageTitle = {this.state.event.eventTitle} 
                            breadCrumbs = {this.state.breadCrumbs}
                        />
                    </div>
                </div>
                <hr style={{margin:'5px 0'}}/>
                <div className="container">
                    <div className="contentBox">
                        <div className="Header">
                            <div className="heading">Categories</div>
                            <div className="subHeading">Please select a category to cast your vote</div>
                        </div>
                        <div className="categoryBoxRow">
                            {   this.state.event.categories.map(category => { 
                                    return ( <CategoryBox 
                                        key={category.id} 
                                        {...category}
                                        clicked={() => this.categorySelectedHandler(category.id)}
                                    />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fragment> 
        )        
    }
}

export default withRouter(VotingEvent);