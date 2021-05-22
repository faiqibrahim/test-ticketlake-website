import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const RavePayIFrameModal = ({ isOpen, focusAfterClose, toggle, ravePayResponse, link, className, errorMessage }) => {
    return (
        <Modal isOpen={isOpen}
            focusAfterClose={focusAfterClose}
            toggle={toggle}
            className={'modal-danger ' + className}
            style={{ width: '100%', maxWidth: '1100px', margin: '50px auto 50px' }}>
            <ModalBody style={{
                width: '100%', maxWidth: '1100px',
                height: ravePayResponse === undefined ? '320px' : '613px'
            }}>
                {ravePayResponse === undefined ?
                    <div className={'paymentCancelDiv'}>{errorMessage ? errorMessage : 'Sorry! The Payment was interrupted.'}</div> :
                    ravePayResponse !== null ?
                        <>
                            <iframe
                                title="RavePay"
                                src={link}
                                style={{
                                    width: '100%',
                                    maxWidth: '1100px',
                                    height: '580px',
                                }} />
                        </>
                        :
                        <div>
                            <b> Loading Rave Pay Dialogue . . . </b>
                        </div>
                }
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} style={{ padding: '0 30px 0 30px' }}
                    className="cancel-btn">
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default RavePayIFrameModal;