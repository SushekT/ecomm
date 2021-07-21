import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { register } from '../../reducers/users/user.action'
import FormContainer from '../../components/Form/form.component'

function RegisterPage({location, match, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, confirmSetPassword ] = useState('')
    const [ message, setMessage ] = useState('')


    const userRegister = useSelector(state => state.userRegister)


    const redirect = location.search ? location.search.split('=')[1] : '/' 
    const { loading, error, userInfo } = userRegister
    const dispatch = useDispatch()
    useEffect(()=>{
        if (userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            console.log(password, confirmPassword)
            setMessage('Your Password Do Not Match')
        }else{
            
            dispatch(register(name, email, password))
        }
    }

  
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                    required
                    type='text'
                    placeholder='Enter Your UserName'
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    required
                    type='email'
                    placeholder='Enter Your Email Id'
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    required
                    type='password'
                    placeholder='Enter Your Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    required
                    type='password'
                    placeholder='Confirm Your Password'
                    value = {confirmPassword}
                    onChange = {(e) => confirmSetPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                <Button type='submit' variant='primary'>
                    Register
                </Button>
                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link to={redirect ? `/register?redirect=${redirect}` : '/login' }>Log In</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )}

export default RegisterPage
