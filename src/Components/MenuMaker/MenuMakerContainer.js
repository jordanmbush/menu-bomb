import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";
import MenuMaker from './MenuMaker';
import Header from '../Shared/Header';
import './menuMaker.css';
import DeleteModal from './deleteCategoryModal';

export default class MenuMakerContainer extends Component {
  constructor(){
      super()
      this.state = {
        menuByCategories: [],
        newCategory: '',
        open: false,
        categoryToDelete: null,
      }
  }

  getMenuItems = () => {
    const restaurantId = (window.location.href).split('/').pop();
    axios.get(`/api/menu-categories/${restaurantId}`).then( menuItems => {
      // CREATE UNIQUE LIST OF CATEGORIES BASED ON MENU ITEM CATEGORIES
      let uniqueCategories = Array.from(new Set(menuItems.data.map( item => item.category)));
      const menuByCategories = [];
      for(let category of uniqueCategories) {
        let itemsByCategory = menuItems.data.filter( item => item.category === category);
        itemsByCategory.forEach(e => e.isDisabled = true);

        menuByCategories.push({
          catName: category,
          items: itemsByCategory,
          id: itemsByCategory[0].categoryid,
        });
      }
      this.setState({
        menuByCategories: menuByCategories,
        open: false
      })
    }).catch( err => {
      console.log('get menu-items err: ', err);
    })
  }

  componentDidMount() {
    this.getMenuItems();
  }

  handleNewCategoryChange = (val) => {
    this.setState({
      newCategory: val,
    })
  }


  addMenuCategory = () => {
    if(this.state.newCategory) {
      const category = {
        category: this.state.newCategory,
        // restaurantId: 1
        restaurantId: this.props.match.params.restaurantId
      }
      axios.post(`/api/category`, category).then( response => {
        const menuByCategories = this.state.menuByCategories.slice();
        const newCategory = {
          catName: this.state.newCategory,
          items: [],
          id: response.data.id,
        };
        menuByCategories.push(newCategory);
        this.setState({
          menuByCategories,
          newCategory: ''
        })
      })
    }
  }

  submitNewItem = (id, newItemName, newItemDescription, newItemPrice, imageUrl) => {

    if(imageUrl == ''){
      imageUrl = 'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/12/18/source-img/20171218172310_94935.jpg'
    }
    
    axios.post('/api/add_new_item', {restaurantId: this.props.match.params.restaurantId, name: newItemName, price: newItemPrice, description: newItemDescription, catId: id, imageUrl: imageUrl}).then(response => {
      this.getMenuItems();
    })
  }

  updateMenuItem = (item) => {
    axios.put('/api/menu-item', item).then( response => {
      this.getMenuItems();
    })
  }

  deleteMenuItem = (id) => {
    axios.delete(`/api/menu-item/${id}`).then( response => {
      this.getMenuItems();
    })
  }

  deleteCategory = (id) => {
    axios.delete(`/api/category/${id}`).then( response => {
      this.getMenuItems();
    })
  }
  
  promptUserToDeleteCategory = (category) => {
    this.setState({
      open: true,
      categoryToDelete: category,
    });
  };
  
  handleClose = () => {
    this.setState({open: false});
  };
  
  render() {
    console.log(this.state)
    return (
      <div>
        <DeleteModal
          modalStatus={this.state.open}
          handleClose={this.handleClose}
          categoryToDelete={this.state.categoryToDelete}
          deleteCategory={this.deleteCategory}/>
        <Header />
        <div className='menu-maker-container-component'>
          <MenuMaker
            handleNewItem={this.handleNewItem}
            menuByCategories={this.state.menuByCategories}
            newCategory={this.state.newCategory}
            addMenuCategory={this.addMenuCategory}
            handleNewCategoryChange={this.handleNewCategoryChange}
            handleMenuItemChange={this.handleMenuItemChange}
            toggleMenuItemEdit={this.toggleMenuItemEdit}
            submitNewItem={this.submitNewItem}
            updateMenuItem={this.updateMenuItem}
            deleteMenuItem={this.deleteMenuItem}
            promptUserToDeleteCategory={this.promptUserToDeleteCategory}
            >
          </MenuMaker>
        </div>
    </div>
    );
  }
}
