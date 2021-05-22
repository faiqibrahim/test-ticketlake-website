import React, {Component} from 'react';
import { Icon, Button } from 'antd';

class FailurePage extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="content">
                    <section className="light-red-bg small-padding event-listing-wrp" data-scrollax-parent="true">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="list-wrap-search lisfw fl-wrap">
                                        <Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d" style={{fontSize:'36px'}}/>
                                        <h2 style={{color:'#f5222d'}}>Sale was not successfull</h2>
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

export default FailurePage;