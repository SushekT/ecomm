import CartTypes from './cart.type'
import SHIPPING from '../ShippingAddress/shipping.type'

export const INITIAL_STATE = {
    cartItems: [],
    shippingAddress: {},
}

export const cartReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CartTypes.CARD_ADDITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product=== item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item: x),
                    }


            }else{
                return{
                    ...state,
                    cartItems: [...state, item]
                }

            }

            case CartTypes.CART_REMOVEITEM:
                return{
                    ...state,
                    cartItems: state.cartItems.filter(x=> x.product !== action.payload)
                }

            case SHIPPING.CART_SAVE_SHIPPING_ADDRESS:
                console.log(action.payload)
                return{
                    ...state,
                    shippingAddress: action.payload,
                }

            case CartTypes.CART_SAVE_PAYMENT:
                return{
                    ...state,
                    paymentMethod: action.payload
                }

            case CartTypes.CART_CLEAR_ITEM:
                return{
                    cartItems: []

                }

            

        default:
            return state
    }
}