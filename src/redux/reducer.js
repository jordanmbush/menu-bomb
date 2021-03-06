import axios from 'axios';
import currency from 'currency.js';

var initialState = {
    user: '',
    loginEmail:'',
    cart: {
        items: [],
        subTotal: 0,
        salesTax: 0,
        total: 0,
    },
}

// TAXES
const TAXES = 0.07;
// user data action
const FETCH_USER_DATA = 'FETCH_USER_DATA';
const FETCH_LOGIN_EMAIL = 'FETCH_LOGIN_EMAIL';
const FETCH_CART = 'FETCH_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECKOUT = 'CHECKOUT'

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_USER_DATA:
    
            return {...state, user: action.payload};

        case FETCH_LOGIN_EMAIL:
    
            return {...state, loginEmail: action.payload};

        case FETCH_CART + '_FULFILLED':

            return {...state, cart: action.payload};

        case ADD_TO_CART + '_FULFILLED':

            return{...state, cart: action.payload};

        case REMOVE_FROM_CART + '_FULFILLED':

            return{...state, cart: action.payload};
        case CHECKOUT + '_FULFILLED':
            return{...state, cart: action.payload};
        default:

            return state;
    }
}

//function to populate user account with user data
export function fetchUserData(user){
    return {
        type: FETCH_USER_DATA,
        payload: user
    }
}

export function fetchLoginEmail(email){
    return {
        type: FETCH_LOGIN_EMAIL,
        payload: email
    }
}

export function fetchCart(){
    return {
        type: FETCH_CART,
        payload: axios.get('/api/cart').then( fetchedCart => {
            const cart  = calculateTotals(fetchedCart.data);
            return cart;
        }).catch(err => console.log('fetchCart err: ', err))
    }
}

export function addToCart(selectedItem){
    const newItem = Object.assign({}, selectedItem); //MAKE COPY OF ITEM TO ADD TO CART
    const cart = Object.assign({}, initialState.cart); //COPY INITIAL STATE
    return {
       type: ADD_TO_CART,
        // POST ITEM TO DATABASE - RETURNS THE NEW CART ITEM WHICH WE WILL USE TO REFERENCE
        // THE ID AND CART ID
        payload: axios.post('/api/cart-item', newItem).then( cartItem => {
            // MAKE A COPY OF THE ADDED ITME
            newItem.cartItemId = cartItem.data.cartItemId; // GET THE ID OF THE ITEM

            cart.items.push(newItem);
            const newCart = calculateTotals(cart); //RECALCULATE TOTALS (TAXES, SUBTOTAL, ETC.)
            return newCart;
        }).catch( err => console.log('addToCart err: ', err ))
    }
}

export function checkout() {
    return {
        type: CHECKOUT,
        payload: axios.get(`/api/cart/`).then( fetchedCart => {
            const cart = calculateTotals(fetchedCart.data);
            return axios.post('/api/checkout', cart).then( response => {
                const emptyCart  = calculateTotals(response.data);
                return emptyCart;
            }).catch(err => console.log('checkout err: ', err));
        }).catch(err => console.log('get cart during checkout err: ', err))
    }
}

export function removeFromCart(cartItemId){
    return {
        type: REMOVE_FROM_CART,
        payload: axios.delete(`/api/cart-item/${cartItemId}`).then( response => {
            return axios.get('/api/cart').then( fetchedCart => {
                const cart  = calculateTotals(fetchedCart.data);
                return cart;
            }).catch(err => console.log('fetchCart err: ', err))
        })
    }
    
}

function calculateTotals(cart) {
    let total = 0;
    const cartWithTotals = Object.assign({}, cart);
    cartWithTotals.items.forEach(item => {
        total = currency(total).add(currency(item.price).multiply(item.quantity).value).value;
    });
    
    const subTotal = total;
    const salesTax = currency(subTotal).multiply(TAXES).value;
    total = currency(subTotal).add(salesTax).value;

    cartWithTotals.total = total;
    cartWithTotals.subTotal = subTotal;
    cartWithTotals.salesTax = salesTax;
    return cartWithTotals;
}