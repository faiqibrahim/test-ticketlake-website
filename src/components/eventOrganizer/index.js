// Library
import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

// Component
import HeroBanner from '../../commonComponents/heroBanner';

class EventOrganizer extends Component {

    state = {
        modalOpen: false
    };

    openModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    };

    render() {
        return (
            <div className="explore-events-wrp">
                <HeroBanner
                    backgroundImage={window.location.origin + '/images/upcoming_events.png'}
                    transformStyle={'translateZ(0px) translateY(-38.1485px)'}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="colomn-text fl-wrap pad-top-column-text_s">
                                    <div className="colomn-text-title">
                                        <h3>Are you an event Organizer?</h3>
                                        <p>Ticketlake is tailor-made for you! Register with us today and get your events on our platform and instantly reach a wider audience never before possible!</p>
                                        <div onClick={() => this.openModal()}
                                             style={{cursor: 'pointer'}}
                                             className={'btn color-bg float-btn float-unset '}>
                                            Publish your events
                                            <i className={'fa fa-caret-right'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </HeroBanner>
                <div>
                    <Modal isOpen={this.state.modalOpen} toggle={this.openModal}
                           className={'modal-danger' + this.props.className}>
                        <ModalHeader toggle={this.openModal}>
                            Contact Support
                        </ModalHeader>
                        <ModalBody>
                            Please contact <b>info@ticketlake.com</b> for further assistance.
                        </ModalBody>
                        <ModalFooter>
                            <button className={'btn btn-danger buttonDefault defaultBackground'} onClick={this.openModal}>
                                Cancel
                            </button>
                        </ModalFooter>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default EventOrganizer;