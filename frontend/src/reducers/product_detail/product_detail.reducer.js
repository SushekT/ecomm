import ProductDetailTypes from './product._detail.type'

const INITTAL_DETAIL_STATE ={
    loading: false,
    product:{
        reviews: []
    }
}

export const productDetailReducers = (state = INITTAL_DETAIL_STATE, action) =>{
    switch (action.type){
        case ProductDetailTypes.PRODUCT_DETAIL_REQUEST:
            console.log(state)
            return{
                loading: true,
                ...state,
            
            }

        case ProductDetailTypes.PRODUCT_DETAIL_SUCCESS:
            return{
                loading: false,
                product: action.payload
            }

        case ProductDetailTypes.PRODUCT_DETAIL_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

    
}

export const productReviewCreateReducers = (state = {}, action) =>{
    switch (action.type){
        case ProductDetailTypes.PRODUCT_CREATE_REVIEW_REQUEST:
            return{
                loading: true,
            
            }

        case ProductDetailTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return{
                loading: false,
                success: true,
            }

        case ProductDetailTypes.PRODUCT_CREATE_REVIEW_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case ProductDetailTypes.PRODUCT_CREATE_REVIEW_RESET:
            return{}


        default:
            return state;
    }

    
}

