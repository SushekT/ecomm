import SHIPPING from "./shipping.type"


export const saveShippingAddress = (data) => (dispatch) => {
    console.log(data)
    dispatch({
        type: SHIPPING.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}