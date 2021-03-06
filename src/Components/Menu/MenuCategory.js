import React, { Component } from 'react';
import styled from "styled-components";
import MenuItem from './MenuItem';

const Wrapper = styled.div`
  margin: 20px 0px;
  text-align: center;
  overflow:hidden;
  font-family: Montserrat;
`
const InnerBox = styled.div`
  margin: 5px auto;
  
  justify-content: space-between;
`
const ItemList = styled.div`
  display: flex;
  width:100%
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  flex-wrap: wrap;
  @media (max-width: 739px) {
    justify-content: center;
  }
`

const CatTitle = styled.h2`
  margin-bottom: 15px;
  padding-bottom: 10px;
  font-size: 24px;
  border-bottom: #e9e9e9 solid 1px;
`

export default class MenuCategory extends Component {
  constructor(props){
      super(props)
      this.state = {

      }
      this.getMenuItems = this.getMenuItems.bind(this);
  }

  getMenuItems() {
    let menuItems = [];
    menuItems = this.props.menuItems.map( item => {
      return (
        <MenuItem key={`render-item-${item.id}`} item={item} handleOpen={this.props.handleOpen}/>
      )
    })
    return menuItems;
  }
  
  render() {
    const menuItems = this.getMenuItems();
    return (
      <Wrapper key={`category-${this.props.category}`} className='menu-category-container'>
        <InnerBox>
          <CatTitle>{this.props.category}</CatTitle>
          <ItemList>
            {menuItems}
          </ItemList>
        </InnerBox>
      </Wrapper>
    );
  }
}