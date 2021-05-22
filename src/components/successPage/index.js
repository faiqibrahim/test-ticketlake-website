import React, {Component} from 'react';
import { Icon, Button } from 'antd';

class SuccessPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="content">
                    <section className="light-red-bg small-padding event-listing-wrp" data-scrollax-parent="true">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="list-wrap-search lisfw fl-wrap">
                                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize:'36px'}}/>
                                        <h2 style={{color:'#52c41a'}}>Sale was successfull</h2>
                                        <p>Your should receive a receipt on your phone/email with your order details in moment</p>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Button type="danger" icon="home" onClick={()=>{this.props.history.push('/')}}>Back to home</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        );
    }
}

export default SuccessPage;