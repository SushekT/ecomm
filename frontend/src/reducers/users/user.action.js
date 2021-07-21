import UserLogin from './user.types'
import axios from 'axios'
import OrderTypes from '../order/order.type'

export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch({
            type: UserLogin.USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login',
        {'username': email, 'password': password}, config
        )

        dispatch({
            type: UserLogin.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: UserLogin.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: UserLogin.USER_LOGOUT
    })

    dispatch({
        type: UserLogin.USER_DETAILS_RESET
    })

    dispatch({
        type: OrderTypes.ORDER_MYORDER_RESET,
    })

    dispatch({
        type: OrderTypes.ORDER_LIST_RESET,
    })


}

export const register = (name, email, password) => async(dispatch) =>{
    try{
        dispatch({
            type: UserLogin.USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register',
        {'name': name, 'username': email, 'email': email, 'password': password},
        config
        )   

        dispatch({
            type: UserLogin.USER_REGISTER_SUCCESS,
            payload: data,
        })
        dispatch({
            type: UserLogin.USER_LOGIN_SUCCESS,
            payload: data,
        })


        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: UserLogin.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}


export const getUserDetails = (id) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UserLogin.USER_DETAILS_REQUEST
        })
        

        const { userLogin } = getState()
        const { userInfo } = userLogin
        console.log(userInfo)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
        config
        )   
        console.log('actionn ni chalyo')

        dispatch({
            type: UserLogin.USER_DETAILS_SUCCESS,
            payload: data,
        })
    


    }catch(error){
        dispatch({
            type: UserLogin.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}


export const getUpdateUserDetails = (user) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UserLogin.USER_UPDATE_REQUEST
        })

        console.log(user)

        const { userLogin } = getState()
        const { userInfo } = userLogin
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
        config
        )   

        dispatch({
            type: UserLogin.USER_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: UserLogin.USER_LOGIN_SUCCESS,
            payload: data,
        })
    
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: UserLogin.USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}


export const listUsers = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UserLogin.USER_LIST_REQUEST
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
            `/api/users/`,
        config
        )   

        dispatch({
            type: UserLogin.USER_LIST_SUCCESS,
            payload: data,
        })

       

    }catch(error){
        dispatch({
            type: UserLogin.USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}

export const deleteUsers = (id) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UserLogin.USER_DELETE_REQUEST
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
            `/api/users/delete/${id}/`,
        config
        )   

        dispatch({
            type: UserLogin.USER_DELETE_SUCCESS,
            payload: data,
        })

       

    }catch(error){
        dispatch({
            type: UserLogin.USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}


export const userAdminUpdates = (user) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UserLogin.USER_ADMINUPDATE_REQUEST
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
            `/api/users/update/${user._id}/`,
            user,
        config
        )   

        dispatch({
            type: UserLogin.USER_ADMINUPDATE_SUCCESS,
        })

        dispatch({
            type: UserLogin.USER_DETAILS_SUCCESS,
            payload : data
        })

       

    }catch(error){
        dispatch({
            type: UserLogin.USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail ?
                        error.response.data.detail 
                        : error.message,
        })
    }
}