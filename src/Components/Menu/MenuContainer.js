import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Menu from './Menu';
import menu from './menu.css';
import Modal from './menuModal';

export default class MenuContainer extends Component {
  constructor(){
      super()
      this.state = {
        menuItems: null,
        open: false,
        selectedItem: {},
        restaurantName:'',
        text: ''
      }
  }
  componentDidMount() {

    const restaurantName = () =>{
      return axios.get(`/api/restaurant-name/${this.props.match.params.id}`);
    }

    const getMenuItems = () =>{
      return axios.get(`/api/menu-items/${this.props.match.params.id}`);
    }

    axios.all([getMenuItems(), restaurantName()]).then(axios.spread((menuItems, name) => {
        this.setState({
          restaurantName: name.data[0].name,
          menuItems: menuItems.data
        })  
    })).catch( err => console.log('getItems and restaurantName err: ', err));
  }
  
  handleOpen = (item) => {
    item.quantity = 1;
    this.setState({
      open: !this.state.open,
      selectedItem: item,
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  changeQuantityAdd = () => {
    if(this.state.selectedItem.quantity >= 1){
      this.setState({
        selectedItem: {...this.state.selectedItem, quantity: this.state.selectedItem.quantity + 1}
      })
    }
 }

 changeQuantitySub = () => {
  if(this.state.selectedItem.quantity > 1){
    this.setState({
      selectedItem: {...this.state.selectedItem, quantity: this.state.selectedItem.quantity - 1}
    })
  }else if(this.state.selectedItem.quantity == 1){
    this.setState({
      selectedItem: {...this.state.selectedItem, quantity: this.state.selectedItem.quantity}
    })
  }
}

changeHandler = (text) => {
  this.setState({
    text: text
  })
}

resetQuantity = () => {
  this.setState({
    selectedItem: {...this.state.selectedItem, quantity: 1},
    text:''
  })
}
  
  render() {
    return (
      <div className='menu-container-component'>
        <Modal modalStatus={this.state.open} text={this.state.text} changeQuantityAdd={this.changeQuantityAdd} quantity={this.state.selectedItem.quantity} changeQuantitySub={this.changeQuantitySub} resetQuantity={this.resetQuantity} handleOpen={this.handleOpen} handleClose={this.handleClose} selectedItem={this.state.selectedItem} changeHandler={this.changeHandler}/>
        {this.state.menuItems && <Menu restaurantName={this.state.restaurantName} menuItems={this.state.menuItems} handleClose={this.handleClose} handleOpen={this.handleOpen}/>}
      </div>
    );
  }
}
