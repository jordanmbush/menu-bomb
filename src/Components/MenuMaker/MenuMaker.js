import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styled from "styled-components";
import MenuCategory from './MakerCategory'

export default class MenuMakerContainer extends Component {
  constructor(){
      super()
      this.state = {

      }
  }
  

  render() {
    console.log('mbc:', this.props.menuByCategories)
    const menuCategories = this.props.menuByCategories.length ? 
      this.props.menuByCategories.map( category => {
        return (<MenuCategory
          category={category}
          newCategory={this.props.newCategory}
          addMenuCategory={this.props.addMenuCategory}
          handleStatePropChanges={this.props.handleStatePropChanges}
          handleNewCategoryChange={this.props.handleNewCategoryChange}
          handleMenuItemChange={this.props.handleMenuItemChange}>
        </MenuCategory>)
       }) : 'Loading...';

    return (
      <div class='menu-maker-component'>
        <div>
          <div className='add-cat'>
            <h1>Add Category</h1>
            <div>
              <input value={this.props.newCategory} onChange={(e) => this.props.handleNewCategoryChange('newCategory', e.target.value)} ></input>
              <button className='add-cat-button'>+</button>
            </div>
          </div>
          {menuCategories}
        </div>
      </div>
    );
  }
}
