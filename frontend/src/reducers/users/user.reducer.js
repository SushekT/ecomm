import UserLogin from './user.types'

const INITIAL_STATE = {
    userInfo : null
}

export const userLoginReducers = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case UserLogin.USER_LOGIN_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_LOGIN_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload
            }

        case UserLogin.USER_LOGIN_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case UserLogin.USER_LOGOUT:
            return{}

        default:
            return state;
    }
}

export const userRegisterReducers = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case UserLogin.USER_REGISTER_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_REGISTER_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload
            }

        case UserLogin.USER_REGISTER_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case UserLogin.USER_LOGOUT:
            return{}

        default:
            return state;
    }
}



const USER_DETAILINITIAL_STATE = {
    user: []
}

export const userDetailsReducers = (state = USER_DETAILINITIAL_STATE, action) =>{
    switch (action.type){
        case UserLogin.USER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_DETAILS_SUCCESS:
            return{
                loading: false,
                user: action.payload
            }

        case UserLogin.USER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case UserLogin.USER_DETAILS_RESET:
            return{
                user: [],
            }
            
        default:
            return state;
    }
}

const USER_PROFILEINITIAL_STATE = {
    success: null
}

export const userUpdateReducers = (state = USER_PROFILEINITIAL_STATE, action) =>{
    switch (action.type){
        case UserLogin.USER_UPDATE_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_UPDATE_SUCCESS:
            return{
                loading: false,
                success: true,
                user: action.payload
            }

        case UserLogin.USER_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case UserLogin.USER_UPDATE_RESET:
            return{}
            
        default:
            return state;
    }
}

export const userListReducers = (state = {users: []}, action) =>{
    switch (action.type){
        case UserLogin.USER_LIST_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_LIST_SUCCESS:
            return{
                loading: false,
                users: action.payload
            }

        case UserLogin.USER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case UserLogin.USER_UPDATE_RESET:
            return{users:[]}
            
        default:
            return state;
    }
}

export const userDeleteReducers = (state = {}, action) =>{
    switch (action.type){
        case UserLogin.USER_DELETE_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_DELETE_SUCCESS:
            return{
                loading: false,
                success : true,
            }

        case UserLogin.USER_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

            
        default:
            return state;
    }
}

export const userAdminUpdateReducers = (state = {user:{}}, action) =>{
    switch (action.type){
        case UserLogin.USER_ADMINUPDATE_REQUEST:
            return{
                ...state,
                loading: true,
                
            }

        case UserLogin.USER_ADMINUPDATE_SUCCESS:
            return{
                loading: false,
                success : true,
            }

        case UserLogin.USER_ADMINUPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case UserLogin.USER_ADMINUPDATE_RESET:
            return{
                user: {}
            }
            
            
        default:
            return state;
    }
}