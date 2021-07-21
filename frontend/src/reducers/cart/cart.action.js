import CartTypes from './cart.type'
import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CartTypes.CARD_ADDITEM,
        payload: { 
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStocks : data.countInStocks,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch,getState) =>{
    dispatch({
        type: CartTypes.CART_REMOVEITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type: CartTypes.CART_SAVE_PAYMENT,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
