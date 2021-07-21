import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { getUpdateUserDetails, getUserDetails } from '../../reducers/users/user.action'
import UserLogin from '../../reducers/users/user.types'
import { myOrderDetails } from '../../reducers/order/order.action'


function ProfilePage({history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, confirmSetPassword ] = useState('')
    const [ message, setMessage ] = useState('')


    const userDetails = useSelector(state => state.userDetails) 
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile) 
    const { success } = userUpdateProfile

    const myOrder = useSelector(state => state.myOrder) 
    const { orders, loading : loadingOrders, error: errorOrders } = myOrder

    const dispatch = useDispatch()

    useEffect(()=>{
        if (!userInfo) {
            history.push('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: UserLogin.USER_UPDATE_RESET})
                dispatch(getUserDetails(userInfo._id))
                dispatch(myOrderDetails())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            console.log(password, confirmPassword)
            setMessage('Your Password Do Not Match')
        }else{
            dispatch(getUpdateUserDetails({
                'id' : user._id,
                'name': name,
                'username': email,
                'email': email,
                'password': password,
            }))
            
        }
        setMessage('')
    }
    return (
        <Row>   
            <Col md={3}>
                <h2>User Profile</h2>
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
                    type='password'
                    placeholder='Enter Your Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    
                    type='password'
                    placeholder='Confirm Your Password'
                    value = {confirmPassword}
                    onChange = {(e) => confirmSetPassword(e.target.value)}>
                        
                    </Form.Control>
                </Form.Group>
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                    
                { loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <ErrorMessage variant = 'danger'>{errorOrders}</ErrorMessage>
                ): (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>Nrs. {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Detail</Button>
                                        </LinkContainer>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
                }
            </Col>
            
        </Row>
    )
}

export default ProfilePage
