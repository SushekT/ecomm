import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { getUserDetails, register, userAdminUpdates } from '../../reducers/users/user.action'
import FormContainer from '../../components/Form/form.component'
import UserLogin from '../../reducers/users/user.types'

function UserEditPage({match, history}) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userAdminUpdate = useSelector(state => state.userAdminUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userAdminUpdate

    const dispatch = useDispatch()
    console.log(userId)
    console.log(user)
    useEffect(()=>{

        if(successUpdate){
            dispatch({type: UserLogin.USER_ADMINUPDATE_RESET })
            history.push('/admin/userlist')
        } else{
            if(!user.name || user._id !== Number(userId)){
                console.log('challyo')
                dispatch(getUserDetails(userId))
    
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
        
    },[userId, user, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(userAdminUpdates({
            _id: user._id, name, email, isAdmin
        }))
       
    }

  
    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading ? <Loader />:
                    error ?
                    <ErrorMessage variant='danger'>{error}</ErrorMessage>
                :(

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Your UserName'
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder='Enter Your Email Id'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='isAdmin'>
                        <Form.Check 
                        type='checkbox'
                        label = 'Is Admin'
                        checked = {isAdmin}
                        onChange = {(e) => setIsAdmin(e.target.checked)}>
                            
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                )
            }
            </FormContainer>
    
        </div>
    )
        
}

export default UserEditPage
