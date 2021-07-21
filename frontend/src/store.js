import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productCreateReducers, productDeleteReducers, productListReducers, productTopReducers, productUpdateReducers,  } from './reducers/product/product.reducer'
import { productDetailReducers, productReviewCreateReducers } from './reducers/product_detail/product_detail.reducer'
import { cartReducers } from './reducers/cart/cart.reducer'
import { userAdminUpdateReducers, userDeleteReducers, userDetailsReducers, userListReducers, userLoginReducers, 
    userRegisterReducers, userUpdateReducers 
    } from './reducers/users/user.reducer'
import { myOrderReducers, OrderCreateReducers, OrderDeliveredReducers, OrderDetailReducers, orderListReducers, OrderPayReducers } from './reducers/order/order.reducer'

 
const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    productReviewCreate: productReviewCreateReducers,
    productTop: productTopReducers,
    cart : cartReducers,
    userLogin : userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateReducers,
    orderCreate: OrderCreateReducers,
    orderDetail: OrderDetailReducers,
    orderPay: OrderPayReducers,
    myOrder: myOrderReducers,
    orderList: orderListReducers,
    OrderDelivered: OrderDeliveredReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userAdminUpdate: userAdminUpdateReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const userLoginFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : []

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    
    },
    userLogin : {userInfo: userLoginFromStorage},
   
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;