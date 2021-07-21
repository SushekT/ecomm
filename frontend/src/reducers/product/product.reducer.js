import ProductListTypes from './product.type'


const INITTAL_LIST_STATE = {
    loading: false,
    products: []
}

export const productListReducers = (state = INITTAL_LIST_STATE, action) =>{
    switch (action.type){
        case ProductListTypes.PRODUCT_LIST_REQUEST:
            return{
                ...state,
                loading: true,
                products: [],
            }

        case ProductListTypes.PRODUCT_LIST_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            }

        case ProductListTypes.PRODUCT_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const productDeleteReducers = (state = {}, action) =>{
    switch (action.type){
        case ProductListTypes.PRODUCT_DELETE_REQUEST:
            return{
                loading: true,
            }

        case ProductListTypes.PRODUCT_DELETE_SUCCESS:
            return{
                loading: false,
                success: true,
            }

        case ProductListTypes.PRODUCT_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const productCreateReducers = (state = {}, action) =>{
    switch (action.type){
        case ProductListTypes.PRODUCT_CREATE_REQUEST:
            return{
                loading: true,
            }

        case ProductListTypes.PRODUCT_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                product: action.payload
            }

        case ProductListTypes.PRODUCT_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case ProductListTypes.PRODUCT_CREATE_RESET:
            return{}

        default:
            return state;
    }
}

export const productUpdateReducers = (state = {product:{}}, action) =>{
    switch (action.type){
        case ProductListTypes.PRODUCT_UPDATE_REQUEST:
            return{
                loading: true,
            }

        case ProductListTypes.PRODUCT_UPDATE_SUCCESS:
            return{
                loading: false,
                success: true,
                product: action.payload
            }

        case ProductListTypes.PRODUCT_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload,
                success: false,
            }

        case ProductListTypes.PRODUCT_UPDATE_RESET:
            return{
                product:{},
            }

        default:
            return state;
    }
}

export const productTopReducers = (state = {products:[]}, action) =>{
    switch (action.type){
        case ProductListTypes.PRODUCT_TOP_REQUEST:
            return{
                loading: true,
                products: []
            }

        case ProductListTypes.PRODUCT_TOP_SUCCESS:
            return{
                loading: false,
                products: action.payload
            }

        case ProductListTypes.PRODUCT_TOP_FAIL:
            return{
                loading: false,
                error: action.payload,
            }


        default:
            return state;
    }
}
