import ProductDetailTypes from './product._detail.type'
import axios from 'axios'

export const listDetailProduct = (id) => async (dispatch) =>{
    try{
        dispatch({
            type: ProductDetailTypes.PRODUCT_DETAIL_REQUEST,
            
        })
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: ProductDetailTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

        

    }
    catch(error){

        dispatch({
            type: ProductDetailTypes.PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail
            : error.message,
        })

    }

}

export const createProductReview = (productId, review) => async(dispatch, getState) =>{
    try{
        console.log(productId)
        dispatch({
            type: ProductDetailTypes.PRODUCT_CREATE_REVIEW_REQUEST
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
            `/api/products/${productId}/reviews/`,
            review,
            config
        )   

        dispatch({
            type: ProductDetailTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })


    }catch(error){
        dispatch({
            type: ProductDetailTypes.PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}