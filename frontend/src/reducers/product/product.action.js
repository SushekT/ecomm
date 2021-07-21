import ProductListTypes from './product.type'
import axios from 'axios'
import ProductDetailTypes from '../product_detail/product._detail.type';

export const listProducts = (keyword= '') => async (dispatch) =>{
    try{
        console.log('ajsndkjsadsahdsad')
        dispatch({
            type: ProductListTypes.PRODUCT_LIST_REQUEST,
            
        })
        const {data} = await axios.get(`/api/products/${keyword}`);

        dispatch({
            type: ProductListTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }
    catch(error){

        dispatch({
            type: ProductListTypes.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail
            : error.message,
        })

    }

}

export const deleteProducts = (id) => async(dispatch, getState) =>{
    try{
    
        dispatch({
            type: ProductListTypes.PRODUCT_DELETE_REQUEST
        })


        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
        config
        )   

        dispatch({
            type: ProductListTypes.PRODUCT_DELETE_SUCCESS,
        })

    

    }catch(error){
        dispatch({
            type: ProductListTypes.PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const createProducts = (id) => async(dispatch, getState) =>{
    try{
    
        dispatch({
            type: ProductListTypes.PRODUCT_CREATE_REQUEST
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
            `/api/products/add/`,
            {},
        config
        )   

        dispatch({
            type: ProductListTypes.PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: ProductListTypes.PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const updateProducts = (product) => async(dispatch, getState) =>{
    try{
        console.log(product)
        dispatch({
            type: ProductListTypes.PRODUCT_UPDATE_REQUEST
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
            `/api/products/edit/${product._id}`,
            product,
        config
        )   

        dispatch({
            type: ProductListTypes.PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: ProductDetailTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data,
        })

    

    }catch(error){
        dispatch({
            type: ProductListTypes.PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const topProducts = () => async (dispatch) =>{
    try{
        dispatch({
            type: ProductListTypes.PRODUCT_TOP_REQUEST,
            
        })
        const {data} = await axios.get(`/api/products/top/`);
        console.log(data)
        dispatch({
            type: ProductListTypes.PRODUCT_TOP_SUCCESS,
            payload: data
        })

    }
    catch(error){

        dispatch({
            type: ProductListTypes.PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail
            : error.message,
        })

    }

}