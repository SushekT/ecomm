import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { login } from '../../reducers/users/user.action'
import FormContainer from '../../components/Form/form.component'

function LoginPage({location, history}) {

    const [email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const redirect = location.search ? location.search.split('=')[1] : '/' 
    const { loading, error, userInfo } = userLogin
    const dispatch = useDispatch()
    useEffect(()=>{
        if (userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }

  
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='Enter Your Email Id'
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter Your Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginPage
