import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getPaymentInfo} from "./payment-info-provider";
import {prepareHoldData} from "./checkout-util";
import Loader from "../../commonComponents/loader";
import PaymentProcessor from "../../commonComponents/PaymentProcessor";
import axios from "../../utils/axios";
import Timer from '../../commonComponents/Timer';
import {Col, Container, Row} from "reactstrap";
import CheckoutSuccess from './CheckoutSuccess';
import CheckoutFailed from "./CheckoutFailed";

class Checkout extends Component {

    state = {
        loading: true,
        reservationId: null,
        orderSuccessful: false,
        orderFailed: false
    };

    componentDidMount() {
        this.holdTickets()
            .then((reservationId) => {
                this.setState({loading: false, reservationId});
            })
            .catch(error => {
                console.error("Could not reserve seats", error);
                this.setState({loading: false});
            })
    }

    holdTickets = async () => {
        const holdData = prepareHoldData();
        const {data} = await axios.post('/reserve/tickets', holdData, 'v2');
        return data.data.reservationId;
    }

    onSuccess = (transactionIds) => {
        const {reservationId} = this.state;

        axios.post("/purchase/tickets", {transactionIds, reservationId}, 'v2')
            .then(({data}) => {
                console.log("Purchase successful", data);
                this.setState(({orderSuccessful: true}))
            })
            .catch(this.onFailure);
    }

    onFailure = (error) => {
        console.error("Could not checkout", error);
        this.setState(({orderFailed: true}));
    }

    render() {
        const {loading, reservationId, orderSuccessful, orderFailed} = this.state;

        if (loading)
            return <Loader/>;
        else if (!reservationId)
            return <div>Could not hold tickets</div>;
        else if (orderFailed)
            return <CheckoutFailed/>;
        else if (orderSuccessful)
            return <CheckoutSuccess/>;

        const info = getPaymentInfo();
        return (
            <>
                <Container style={{textAlign: 'left', fontSize: '1rem'}}>
                    <Row>
                        <Col style={{padding: '12px 0px'}}>
                            Your reservation will expire in
                            <Timer style={{fontWeight: 'bold', color: '#EC1B23'}}
                                   minutes={15} onComplete={this.onFailure}/>
                        </Col>
                    </Row>
                </Container>

                <PaymentProcessor {...info} onSuccess={this.onSuccess} onFailure={this.onFailure}/>
            </>
        )
    }
}

export default withRouter(Checkout);
