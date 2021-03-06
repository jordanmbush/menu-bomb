import React, {Component} from 'react';
import Header from '../Shared/Header';
import axios from 'axios';
import './registerRestaurant.css'


function isValid(password, email, phone, address1, address2, firstName, lastName, restaurantName) {
    // true means invalid
    return {
        password: password.length === 0,
        email: email.length === 0,
        phone: phone.length !== 10,
        address1: address1.length === 0,
        address2: address2.length === 0,
        firstName: firstName.length === 0,
        lastName: lastName.length ===0,
        restaurantName: restaurantName.length===0
    };
  }

// Registration Component to gather the appropriate data for registration as a Restaurant
export default class RegisterRestaurant extends Component {
    constructor(){
        super()
        
        this.state = {
            password: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            firstName: '',
            lastName: '',
            restaurantName:'',
            password: '',
    // Touched will prevent the Input fields from defaulting to the error border before the user has inputted any value
            touched: {
                password: false,
                email: false,
                phone: false,
                address1: false,
                address2: false,
                firstName: false,
                lastName: false,
                restaurantName: false
            },
        }

            this.handlePasswordChange = this.handlePasswordChange.bind(this)
            this.handleEmailChange = this.handleEmailChange.bind(this)
            this.handlePhoneChange = this.handlePhoneChange.bind(this)
            this.handleAddress1Change = this.handleAddress1Change.bind(this)
            this.handleAddress2Change = this.handleAddress2Change.bind(this)
            this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
            this.handlerestaurantNameChange = this.handlerestaurantNameChange.bind(this)
            
            }
            handlePasswordChange(event) {
                this.setState({ password: event.target.value })
            }
            handleEmailChange(event) {
                this.setState({ email: event.target.value })
            }
            handlePhoneChange(event) {
                this.setState({ phone: event.target.value })
            }
            handleAddress1Change(event) {
                this.setState({ address1: event.target.value })
            }
            handleAddress2Change(event) {
                this.setState({ address2: event.target.value })
            }
            handleFirstNameChange(event) {
                this.setState({ firstName: event.target.value })
            }
            handleLastNameChange(event) {
                this.setState({ lastName: event.target.value })
            }
            handlerestaurantNameChange(event) {
                this.setState({ restaurantName: event.target.value })
            }

    // Handle Submit
            handleSubmit(event) {
                event.preventDefault();
                if (!this.canBeSubmitted()) {
                    event.preventDefault();
                    console.log(this.state.email);
                    return;
                }    
                const{password, email, phone, address1, address2, firstName, lastName, restaurantName} = this.state
                  
            }
            // This function will run the validate function against the user input values 
            canBeSubmitted() {
                const errors = isValid(this.state.password, this.state.email, this.state.phone, this.state.address1, this.state.address2, this.state.firstName, this.state.lastName, this.state.restaurantName);
                const isDisabled = Object.keys(errors).some(x => errors[x]);
                console.log(this.state.email);
                // const url = window.location.origin;
                // const url = `${url}${this.props.match.params.userType}/orders`
                axios.post('/register', {email: this.state.email, password: this.state.password, phone: this.state.phone, address1: this.state.address1, address2: this.state.address2, firstName: this.state.firstName, lastName: this.state.lastName, password: this.state.password, userType: this.props.match.params.userType, restaurantName: this.state.restaurantName}).then(response => {
                    window.location.href = `/${this.props.match.params.userType}/orders`
                })
                return !isDisabled;
            }
            // Returning !isDisabled will allow our submit button to be selected
            // disregard this code at this point it is unfinished, but eventually display a red border around fields with errors
            handleBlur = (field) => (event) => {
                this.setState({
                touched: { ...this.state.touched, [field]: true },
                });
            }
        
        render() {
            const shouldMarkError = (field) => {
                const hasError = errors[field];
                const shouldShow = this.state.touched[field];
                return hasError ? shouldShow : false;
            }
            const errors = isValid(this.state.password, this.state.email, this.state.phone, this.state.address1, this.state.address2, this.state.firstName, this.state.lastName, this.state.restaurantName);
            const isDisabled = Object.keys(errors).some(x => errors[x]);
            return (
    <div>
        <Header/>
        <div className='registration-form'>
            <form  onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <h2>{this.props.match.params.userType}</h2>

                {this.props.match.params.userType === 'restaurant' ? <input
                className={errors.restaurantName ? "error" : ""}
                type="text"
                placeholder="Enter Restauraunt Name"
                value={this.state.restaurantName}
                onChange={(e) => this.handlerestaurantNameChange(e)}
                />: ''}

                <input
                className={errors.email ? "error" : ""}
                type="text"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={(e) => this.handleEmailChange(e)}
                />

                <input
                className={errors.password ? "error" : ""}
                type="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={(e) => this.handlePasswordChange(e)}
                />
                
                <input
                className={errors.phone ? "error" : ""}
                type="text"
                placeholder="Enter Phone Number"
                value={this.state.phone}
                onChange={(e) => this.handlePhoneChange(e)}
                />
                <input
                className={errors.address1 ? "error" : ""}
                type="text"
                placeholder="Enter Address 1"
                value={this.state.address1}
                onChange={(e) => this.handleAddress1Change(e)}
                />
                <input
                className={errors.address2 ? "error" : ""}
                type="text"
                placeholder="Enter Address 2"
                value={this.state.address2}
                onChange={(e) => this.handleAddress2Change(e)}
                />
                <input
                className={errors.firstName ? "error" : ""}
                type="text"
                placeholder="Enter First Name"
                value={this.state.firstName}
                onChange={(e) => this.handleFirstNameChange(e)}
                />
                <input
                className={errors.lastName ? "error" : ""}
                type="text"
                placeholder="Enter Last Name"
                value={this.state.lastName}
                onChange={(e) => this.handleLastNameChange(e)}
                />
                <button  onClick={(e) => this.handleSubmit(e)}>Register</button>
            </form>
        </div>
    </div>
            )
        
  }
}

