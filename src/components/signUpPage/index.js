// library
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import moment from "moment";
import DatePicker from "react-datepicker";
// import Select from 'react-select'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";

// Redux
import {resetRedux, saveFormData, verifyUser} from '../../redux/user/user-actions';
import connect from 'react-redux/es/connect/connect';
import Loader from "../../commonComponents/loader";
import { Checkbox} from 'antd';
// import { SettingOutlined } from '@ant-design/icons';
import {Modal, ModalBody} from 'reactstrap';

// Helpers
import {getCountries, getCities, getDateFromISO} from '../../utils/common-utils';
import CollapseAbleComponent from './collapsableComponent';

const countries = [];
let cities = [];

class SignUp extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            country: '',
            city: '',
            dateOfBirth: '',
            errorName: '',
            errorEmail: '',
            errorPassword: '',
            errorPhone: '',
            errorCountry: '',
            errorCity: '',
            errorDOB: '',
            error:'',
            selectedCountry: '',
            selectedOptionCity: '',
            defaultCountry: 'gh',
            phone: "",
            phoneData: {dialCode: 233, countryCode: 'gh'},
            fbData:[],
            agreeTermsAndCondition:false,
            modalOpen: false
        };

    }


    componentWillMount() {
        getCountries().forEach((data) => {
            let isExist = countries.filter(country => country.value === data);

            if (!isExist || !isExist.length) {
                countries.push({
                    value: data,
                    label: data
                });
            }
        });
        this.setState({selectedCountry:countries[0].value,country:countries[0].value},()=>{
            let {selectedCountry} = this.state;

            const citiesArr = [];

            getCities(selectedCountry).forEach((data) => {

                citiesArr.push({
                    label: data,
                    value: data,
                    link: selectedCountry
                });
            });


            cities = citiesArr;

            this.setState({selectedOptionCity:cities[0].value,city:citiesArr[0].value})
        })
    }

    componentDidMount() {
        let fbData = JSON.parse(localStorage.getItem("fbLoacalData"));
        let googledata = JSON.parse(localStorage.getItem("googleLoacalData"));
        if(fbData!==null){
            this.setState({
                fbData:fbData,
                name:fbData.name
            })
        }else if(googledata!==null){
            this.setState({
                googledata:googledata.profileObj,
                name:googledata.profileObj!==undefined?googledata.profileObj.name:"",
                email:googledata.profileObj!==undefined?googledata.profileObj.email:""
            })
        }else{
            this.setState({
                name:''
            })
        }
        
        this.props.resetRedux();
    };

    onInputChange = (e) => {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getPhoneNumberValid = (phoneNumber) => {
        return isValidPhoneNumber(phoneNumber);
    };

    getEmailValid = (email) => {
        return validator.isEmail(email);
    };

    onSaveChanges = (e) => {
        e.preventDefault();
        const state = {...this.state };
        const { phone, email } = this.state;
        let isEmailValid = this.getEmailValid(email);
        let isValidNumber = this.getPhoneNumberValid(phone);

        if (state.name === '') {
            this.setState({ errorName: "Please enter the name" });
        }
        if (isEmailValid) {
            this.setState({ errorEmail: "" });
        }
        if (!isEmailValid) {
            this.setState({ errorEmail: "Please enter valid Email" });
        }
        if (state.password === '') {
            this.setState({ errorPassword: "Please enter the password" });
        }
        if (isValidNumber) {
            this.setState({ errorPhone: "" });
        }
        if (!isValidNumber) {
            this.setState({ errorPhone: "Please enter valid phone Number" });
        }
        if(state.country === '') {
            this.setState({errorCountry: "Please enter the country"});
        }if(state.city === '') {
            this.setState({errorCity: "Please enter the city"});
        }if(state.dateOfBirth === '') {
            this.setState({errorDOB: "Please enter the DOB"});
        } else {
            this.props.resetRedux();
            this.setState({error:''},()=>{
                let stateData;
                if(this.state.name!==undefined){
                    stateData = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        phoneNumber: this.state.phone,
                        country: this.state.country,
                        city: this.state.city,
                        dateOfBirth: getDateFromISO(this.state.dateOfBirth),
                        faceBookID:this.state.fbData.userID
                    };
                }
                else{
                    stateData = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    phoneNumber: this.state.phone,
                    country: this.state.country,
                    city: this.state.city,
                    dateOfBirth: getDateFromISO(this.state.dateOfBirth),
                    };
            }
                this.props.saveFormData(stateData);

                this.props.verifyUser(
                    (userState) => {
                        this.props.history.push('/sign-up/verification', {...userState});
                    },
                    () => {
                        this.props.history.push('/')
                    },
                    (errorCB) => {
                        console.error(errorCB);
                    }
                );
            })
        }
    };

    handleChange = (date) => {
        this.setState({
            dateOfBirth: date
        });
    };

    _style = {
        paddingLeft: '20px',
        float: 'left',
        border: ' 1px solid #eee',
        backgroundColor: '#F2F3F8',
        width: '100%',
        padding: ' 14px 170px 14px 20px',
        borderRadius: '6px',
        color: '#666',
        fontSize: '13px',
        WebkitAppearance: 'none'
    };

    fetchCities = (e)=> {
        cities = [];
        const citiesArr = [];
        let value = e.target.value;
        getCities(value).forEach((data) => {
            citiesArr.push({
                label: data,
                value: data,
                link: value
            });
        });
        this.setState({selectedCountry: e.target.value});
        this.setState({selectedOptionCity: []});
        this.setState({country: e.target.value});
        cities = citiesArr;
    };

    setCity = (e)=> {
        this.setState({selectedOptionCity: e.target.value});
        this.setState({city: e.target.value});
    };

    handlePhoneChange = (value) => {
        this.setState({phone: value});
    };

    agreeTermsAndCondition = (e) =>{
        this.setState({
            agreeTermsAndCondition: e.target.checked
        })
    }
    openTermsAndCondition = () =>{
        this.openModal()
    }
    openModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    verifyTermsAndCondtiiton = () =>{
        this.setState({
            modalOpen: !this.state.modalOpen,
            agreeTermsAndCondition: true
        })
    }

    getForm = () => {
        const styles = {
            valueContainer: base => ({
                ...base,
                paddingLeft: 20
            })
        };
        return (
            <div id="tab-2" className="tab-content" style={{display: 'block'}}>
                <h3>Sign up <span>TicketLake</span></h3>
                {
                    this.props.processing ?
                        <Loader/> :
                        <Form onSubmit={this.onSaveChanges}>
                            <div className="custom-form">
                                <div className="main-register-form" id="main-register-form2">
                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Email <span>*</span> </label>
                                        <Input name="email" id="email" type="email" placeholder="Email"
                                               value={this.state.email}
                                               onChange={this.onInputChange}/>
                                               {this.state.errorEmail === '' ? undefined : <span className = {"signup-error-message"} style = {{ color: 'red' } } > { this.state.errorEmail } < /span> }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Password <span>*</span></label>
                                        <Input name="password" type="password" placeholder="Password"
                                               value={this.state.password}
                                               onChange={this.onInputChange}/>
                                        {this.state.errorPassword !== '' ? (this.state.password === '') ? <span className={"signup-error-message"} style={{color: 'red'}}>{this.state.errorPassword}</span> : null : null }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Name <span>*</span> </label>
                                        <Input name="name" id="name" type="text" placeholder="Name" value={this.state.name}
                                               onChange={this.onInputChange}/>
                                        {this.state.errorName !== '' ? (this.state.name === '') ? <span className={"signup-error-message"} style={{color: 'red'}}>{this.state.errorName}</span> : null : null }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Phone Number <span>*</span> </label>
                                        <div>
                                            <ReactPhoneInput
                                                countryCodeEditable={false}
                                                country={this.state.defaultCountry}
                                                value={this.state.phone}
                                                onChange={this.handlePhoneChange}
                                            />
                                        </div>
                                        {this.state.errorPhone === '' ? undefined : <span className = {"signup-error-message"} style = {{ color: 'red' } } > { this.state.errorPhone } < /span> }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Country<span>*</span></label>
                                        <select placeholder={"Select Country"} id={"country"} name={"country"}
                                                className='react-select-container iconSelectDropDown dropdown-select'
                                                value={this.state.selectedCountry}
                                                onChange={this.fetchCities}
                                                style={styles}
                                        >
                                            {countries.map((country, index) => {
                                                return (
                                                    <option key={index} value={country.value}>{country.label}</option>
                                                )
                                            })}
                                        </select>
                                        {this.state.errorCountry !== '' ? (this.state.country.value === '') ? <span className={"signup-error-message"} style={{color: 'red'}}>{this.state.errorCountry}</span> : null : null }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>City<span>*</span></label>
                                        <select placeholder={"City"} id={"city"}
                                                className='react-select-container iconSelectDropDown dropdown-select'
                                                name='city' value={this.state.selectedOptionCity}
                                                onChange={this.setCity} style={styles}
                                        >
                                            {cities.map((city, index) => {
                                                return (
                                                    <option key={index} value={city.value}>{city.label}</option>
                                                )
                                            })}
                                        </select>
                                        {this.state.errorCity !== '' ? (this.state.city.value === '') ? <span className={"signup-error-message"} style={{color: 'red'}}>{this.state.errorCity}</span> : null : null }
                                    </div>

                                    <div className={"field-wrp"}>
                                        <label style={{marginBottom:'10px'}}>Date of Birth<span>*</span></label>
                                        <div className={"row dateOfBirth"}>
                                            <div className={"col-md-12"}>
                                                <DatePicker
                                                    //required
                                                    placeholderText={"Date of Birth"}
                                                    selected={this.state.dateOfBirth}
                                                    onChange={this.handleChange}
                                                    customInput={<Input style={this._style}/>}
                                                    maxDate={new Date(moment(new Date()).subtract(0, 'years').format())}
                                                    n={new Date(moment(new Date()).subtract(100, 'years').format())}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    scrollableYearDropdown
                                                    yearDropdownItemNumber={15}
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            </div>
                                        </div>
                                        {this.state.errorDOB !== '' ? (this.state.dateOfBirth === '') ? <span className={"signup-error-message"} style={{color: 'red'}}>{this.state.errorDOB}</span> : null : null }
                                    </div>

                                    <div className="terms-and-condition-wrap">
                                        <Checkbox
                                            onChange={this.agreeTermsAndCondition}
                                            checked={this.state.agreeTermsAndCondition}
                                            className="terms-and-condition-main"
                                        >
                                                Agree to
                                        </Checkbox>
                                        <div
                                            className="terms-and-condition-underline"
                                            onClick={this.openTermsAndCondition}>
                                                Terms & Conditions
                                        </div>
                                        <Modal isOpen={this.state.modalOpen} toggle={this.openModal}
                                            className="modal-terms-conditions modal-danger">
                                            {/* <ModalHeader toggle={this.openModal}> */}
                                            <h3>Terms & Conditions</h3>
                                            {/* </ModalHeader> */}
                                            <ModalBody style={{padding: '0px 0px 40px 0px'}} className="left">
                                               <CollapseAbleComponent/>
                                            </ModalBody>
                                            {/* <ModalFooter> */}
                                                <button className={'center-btn btn btn-danger buttonDefault defaultBackground fw-bold '} onClick={this.verifyTermsAndCondtiiton}>
                                                    Agree Terms & Conditions
                                                </button>
                                            {/* </ModalFooter> */}
                                        </Modal>
                                    </div>

                                    <button
                                        type="submit"
                                        className="log-submit-btn"
                                        style={this.state.agreeTermsAndCondition?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                        disabled={this.state.agreeTermsAndCondition?false:true}
                                        >
                                            <span>Register</span>
                                    </button>
                                </div>
                            </div>
                        </Form>
                }

            </div>
        )
    };


    render() {
        return (
            <div>
                {this.getForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        processing: state.user.processing,
    }
};

const connected = connect(mapStateToProps, {resetRedux, saveFormData, verifyUser})(SignUp);
export default withRouter(connected);
