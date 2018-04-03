import React, {Component} from 'react';
import './restaurantRegister.css'


function isValid(name, email, phone) {
    // true means invalid
    return {
        name: name.length === 0,
        email: email.length === 0,
        phone: phone.length !== 10,
        address1: address1.length === 0
    };
  }

// Registration Component to gather the appropriate data for registration as a Restaurant
export default class RegisterRestaurant extends Component {
    constructor(){
        super()
        
        this.state = {
            name: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            firstName: '',
            lastName: '',
    // Touched will prevent the Input fields from defaulting to the error border before the user has inputted any value
            touched: {
                name: false,
                email: false,
                phone: false,
                address1: false,
                address2: false,
                firstName: false,
                lastName: false,
            },
        }

            this.handleNameChange = this.handleNameChange.bind(this)
            this.handleemailChange = this.handleemailChange.bind(this)
            this.handlePhoneChange = this.handlePhoneChange.bind(this)
            this.handleAdresss1Change = this.handleAdresss1Change.bind(this)
            this.handleAddress2Change = this.handleAddress2Change.bind(this)
            this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
            
            }
            handleNameChange(event) {
                this.setState({ name: event.target.value })
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

    // Handle Submit
            handleSubmit(event) {
                if (!this.canBeSubmitted()) {
                    event.preventDefault();
                    return;
                }    
                const{name, email, phone, address1, address2, firstName, lastName} = this.state
                alert(`Registered as: ${name}, @ ${email}`);    
            }
            // This function will run the validate function against the user input values 
            canBeSubmitted() {
                const errors = validate(this.state.name, this.state.email, this.state.phone, this.state.address1);
                const isDisabled = Object.keys(errors).some(x => errors[x]);
                return !isDisabled;
            }
            // Returning !isDisabled will allow our submit button to be selected
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
            const errors = validate(this.state.name, this.state.email, this.state.phone, this.state.address1);
            const isDisabled = Object.keys(errors).some(x => errors[x]);
            return (
            <form onSubmit={this.handleSubmit}>
                <input
                className={errors.name ? "error" : ""}
                type="text"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={this.handleNameChange}
                />
                <input
                className={errors.email ? "error" : ""}
                type="text"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                />
                <input
                className={errors.phone ? "error" : ""}
                type="text"
                placeholder="Enter Phone Number"
                value={this.state.phone}
                onChange={this.handlePhoneChange}
                />
                <input
                className={errors.address1 ? "error" : ""}
                type="text"
                placeholder="Enter Address 1"
                value={this.state.address1}
                onChange={this.handleAddress1Change}
                />
                <input
                className={errors.address2 ? "error" : ""}
                type="text"
                placeholder="Enter Name"
                value={this.state.address2}
                onChange={this.handleAddress2Change}
                />
                <input
                className={errors.firstName ? "error" : ""}
                type="text"
                placeholder="Enter First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
                />
                <input
                className={errors.lastame ? "error" : ""}
                type="text"
                placeholder="Enter Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
                />
                <button disabled={isDisabled}>Register!</button>
            </form>
            )
        
  }
}
