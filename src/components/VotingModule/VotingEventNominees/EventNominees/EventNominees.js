import React,{ Fragment,Component } from 'react';
import { withRouter } from 'react-router-dom';
import NomineeCard from '../NomineeCard/NomineeCard';
import NomineeModalBody from '../../Modal/NomineeModalBody/NomineeModalBody';
import './EventNominees.css';
import { getEventCategoryDetail } from '../../data-fetcher';
import VotingHeader from '../../Header/Layout/Layout';
import { Modal } from 'antd';
import '../../VotingModule.css';



class EventNominees extends Component {

    state = {
        loading : true,
        event  : null,
        visible: false,
        nomineeId : null,
    }


    componentDidMount(){

        const {id, categoryId} = this.props.match.params;
        getEventCategoryDetail(id,categoryId)
            .then((event) =>{
            this.setState({
                loading:false,
                event,
                breadCrumbs : [
                    { path :"/", crumbTitle:"Home"},
                    { path : '/voting' ,crumbTitle : 'Votings'},
                    { path : `/voting/${event.id}`, crumbTitle:event.eventTitle},
                    { path : `/voting/${event.id}/categories/${categoryId}`, crumbTitle:event.category.name}
                ]
                })
            }).catch((error) =>{
        })
        
    }

    toggleModal = (id = null) => {
        this.setState({
            visible: !this.state.visible,
            nomineeId: id
        });
    };
  
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
      }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    renderNomineesModal = () => {        

        const {nomineeId} = this.state;

        if(!nomineeId) return null;

        return(
            <Modal
                title=""
                visible={this.state.visible}
                onOk={this.toggleModal}
                onCancel={this.toggleModal}
                width={800}
                height={800}
                wrapClassName = "NomineeModal"
                footer={null}
                >
                    <NomineeModalBody  
                        handleOk={this.handleOk}
                        nomineeId={nomineeId}
                        key={nomineeId}
                        />
                        
            </Modal>
        )
    }

    render(){
        
        if(this.state.loading) return <p>Component Loading!</p> 

        return(
            <Fragment>
                {this.renderNomineesModal()}
                <div className="container">
                    <div className="headerContainer">
                        <VotingHeader 
                            pageTitle = {this.state.event.category.name} 
                            breadCrumbs = {this.state.breadCrumbs}
                        />
                    </div>
                </div>    
                <hr style={{margin:'5px 0'}}/>
                <div className="container eventNomineesContainer">  
                    <div className="contentBox">
                        <div className="Header">
                            <div className="nomineeHeaderCol">
                                <div className="heading">Nominees for "{this.state.event.category.name}"</div>
                                <div className="subHeading">Please select a nominee to vote for</div>
                            </div>
                            <div className="nomineeHeaderCol">
                                <div className="timeContent">
                                    <div className="nomineeBoxRow">
                                        <div className="col3">
                                            <img className="timerClock" src={"/images/votingimages/clock.svg"} alt="img"/>
                                        </div>
                                        <div className="col9">
                                            <div className="timeLeft">02 hours, 30 mins</div>
                                            <div className="timeText">Remaining in votings..</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nomineeBoxRow">
                            {   this.state.event.category.nominees.map(nominee => { 
                                    return ( <NomineeCard 
                                        key={nominee.id} 
                                        {...nominee}
                                        clicked={() => this.toggleModal(nominee.id)}
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

export default withRouter(EventNominees);