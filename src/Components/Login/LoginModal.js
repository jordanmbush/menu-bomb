import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import './loginModal.css';

export default class DialogExampleModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            email: '',
            password: ''
          };
    }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleEmail = (email) => {
    this.setState({
        email: email
    })
  }

  handlePassword = (password) => {
    this.setState({
        password: password
    })
  }

  loginButton = () => {
    axios.post('/login', {email: this.state.email, password: this.state.password}).then(response => {
        console.log(response.data)
        window.location.href = response.data.userType;
    })
  }

  render() {

    const customContentStyle = {
        width: '100%',
        maxWidth: '400px',
        textAlign:'center'
      };

    const titleStyle = {
        padding: '10px'
    }

    return (
      <div className='login-modal-container'>
        <a href='#' onClick={this.handleOpen}>Login</a>
        <Dialog
          title="Login/Register"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          titleStyle={titleStyle} 
        >
        <div className='login-modal-content'>
          <div className='modal-login'>
                <div>
                    <span>Email</span>
                    <input onChange={(e)=> this.handleEmail(e.target.value)} value={this.state.email} type='email'/>
                </div>
                <div>
                    <span>Password</span>
                    <input onChange={(e)=> this.handlePassword(e.target.value)} value={this.state.password} type='password' />
                </div>
                <button onClick={()=> this.loginButton()} className='btn'> Login </button>
            </div>
            <div className='modal-register'>
                <h1>Register</h1>
                <div>
                    <button className='btn'>
                        Customer
                    </button>
                    <button className='btn'>
                        Restaurant
                    </button>
                </div>
            </div>
        </div>
        </Dialog>
      </div>
    );
  }
}