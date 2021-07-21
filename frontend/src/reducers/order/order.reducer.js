import OrderTypes from './order.type';

const INITIAL_STATE = {
    loading: false,
    success: false,

}

export const OrderCreateReducers = (state=INITIAL_STATE, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_CREATE_REQUEST:
            return{
                loading: true,
            }

        case OrderTypes.ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                order: action.payload
            }

        case OrderTypes.ORDER_CREATE_FAIL:
            return{
                loading: false,
                success: false,
                error: action.payload
            }

        case OrderTypes.ORDER_CREATE_RESET:
            return{
            }

        default:
            return state
    }

}

const ORDER_DETAIL_INITIAL_STATE = {
    loading: true,
    orderItems: [],
    shippingAddress: {}

}


export const OrderDetailReducers = (state=ORDER_DETAIL_INITIAL_STATE, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_DETAIL_REQUEST:
            return{
                ...state,
                loading: true,
            }

        case OrderTypes.ORDER_DETAIL_SUCCESS:
            return{
                loading: false,
                order: action.payload
            }

        case OrderTypes.ORDER_DETAIL_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}


export const OrderPayReducers = (state={}, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_PAY_REQUEST:
            return{
                loading: true,
            }

        case OrderTypes.ORDER_PAY_SUCCESS:
            return{
                success: true,
                loading: false,
            }

        case OrderTypes.ORDER_PAY_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case OrderTypes.ORDER_PAY_RESET:
            return{
                
            }

        default:
            return state
    }

}

export const myOrderReducers = (state={ orders: []}, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_MYORDER_REQUEST:
            return{
                loading: true,
            }

        case OrderTypes.ORDER_MYORDER_SUCCESS:
            return{
                orders: action.payload,
                loading: false,
            }

        case OrderTypes.ORDER_MYORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case OrderTypes.ORDER_MYORDER_RESET:
            return{
                orders : []
            }

        default:
            return state
    }

}

export const orderListReducers = (state={ orders: []}, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_LIST_REQUEST:
            return{
                loading: true,
            }

        case OrderTypes.ORDER_LIST_SUCCESS:
            return{
                orders: action.payload,
                loading: false,
            }

        case OrderTypes.ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
 
        default:
            return state
    }

}

export const OrderDeliveredReducers = (state={}, action) =>{

    switch(action.type){
        case OrderTypes.ORDER_DELIVERED_REQUEST:
            return{
                loading: true,
            }

        case OrderTypes.ORDER_DELIVERED_SUCCESS:
            return{
                success: true,
                loading: false,
            }

        case OrderTypes.ORDER_DELIVERED_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case OrderTypes.ORDER_DELIVERED_RESET:
            return{
                
            }

        default:
            return state
    }

}