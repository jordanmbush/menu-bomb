var initialState = {
    user: '',
    loginEmail:'',
    cart: {
        menu_items: [],
        total: 0
    }
}

// user data action
const FETCH_USER_DATA = 'FETCH_USER_DATA';
const FETCH_LOGIN_EMAIL = 'FETCH_LOGIN_EMAIL';
const FETCH_CART = 'FETCH_CART';
const ADD_TO_CART = 'ADD_TO_CART';

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_USER_DATA:
    
            return {...state, user: action.payload};

        case FETCH_LOGIN_EMAIL:
    
            return {...state, loginEmail: action.payload};

        case FETCH_CART:

            return {...state, cart: action.payload};

        case ADD_TO_CART:

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

export function fetchCart(cart){
    return {
        type: FETCH_CART,
        payload: cart
    }
}

export function addToCart(selectedItem){
    let newCart = initialState.cart.menu_items;
    newCart.push(selectedItem);
    return {
        type: ADD_TO_CART,
        payload: newCart
    }
}
