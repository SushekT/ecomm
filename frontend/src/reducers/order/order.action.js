import OrderTypes from './order.type';
import axios from 'axios'
import CartTypes from '../cart/cart.type';

export const createOrder = (order) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: OrderTypes.ORDER_CREATE_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
        config
        )   

        dispatch({
            type: OrderTypes.ORDER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CartTypes.CART_CLEAR_ITEM,

        })

        localStorage.removeItem('cartItems')
    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}



export const getOrderDetails = (id) => async(dispatch, getState) =>{
    try{
    
        dispatch({
            type: OrderTypes.ORDER_DETAIL_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
        config
        )   

        dispatch({
            type: OrderTypes.ORDER_DETAIL_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const getPayDetails = (id, paymentResult) => async(dispatch, getState) =>{
    try{
        console.log(id)
        console.log(paymentResult)
        dispatch({
            type: OrderTypes.ORDER_PAY_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )   
        console.log(data)

        dispatch({
            type: OrderTypes.ORDER_PAY_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const myOrderDetails = () => async(dispatch, getState) =>{
    try{
    
        dispatch({
            type: OrderTypes.ORDER_MYORDER_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myOrders/`,
        config
        )   

        dispatch({
            type: OrderTypes.ORDER_MYORDER_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_MYORDER_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}



export const listOrders = () => async(dispatch, getState) =>{
    try{
    
        dispatch({
            type: OrderTypes.ORDER_LIST_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
        config
        )   

        dispatch({
            type: OrderTypes.ORDER_LIST_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const deliveredOrder = (order) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: OrderTypes.ORDER_DELIVERED_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/delivered/`,
            {},
            config
        )   
    

        dispatch({
            type: OrderTypes.ORDER_DELIVERED_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: OrderTypes.ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}