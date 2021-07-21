import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'

import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import Loader from '../../components/Loader/loader.component'
import { deliveredOrder, getOrderDetails, getPayDetails } from '../../reducers/order/order.action';
import OrderTypes from '../../reducers/order/order.type';


function OrderPage({ match }) {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetail = useSelector(state => state.orderDetail)
    const {loading, order, error} = orderDetail
   
    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success:successPay} = orderPay

    const OrderDelivered = useSelector(state => state.OrderDelivered)
    const {loading: loadingDelivered, success:successDelivered} = OrderDelivered

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    if ( !loading && !error ){
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    }
    
    const addPaypalScript =() =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AU-4immIUnLKhNRCH3K2Si2B8e4uN9RCjmNs9IX2h5iBBU_KKHIhCv-n6zlf_9TFRhiCmaKI-AhaRk-F'
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }
    useEffect(() =>{
        if (!order || successPay || order._id !== Number(orderId) || successDelivered){
            dispatch({type: OrderTypes.ORDER_PAY_RESET})
            dispatch({type: OrderTypes.ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(orderId))
            
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
   
    }, [dispatch, order, orderId, successPay, successDelivered])

    const successPaymentHandler = (paymentResult) =>{
        console.log('chalyo')
        dispatch(getPayDetails(orderId, paymentResult))
        
    }

    const deliverHandler = () =>{

        dispatch(deliveredOrder(order))
        
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <p><strong>Ordered By</strong> {order.users.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.users.email}`}>{order.users.email}</a> </p>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'   '} {order.shippingAddress.postalCode}
                                {'   '} {order.shippingAddress.country}
                            </p>
                            {order.isDeivered? (
                                <ErrorMessage variant='success'>Delivered On: {order.deliveredAt}</ErrorMessage>
                            ): (
                                <ErrorMessage variant='warning'>Not Delivered</ErrorMessage>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.payment_method}
                            </p>
                            {order.isPaid ? (
                                <ErrorMessage variant='success'>Paid On: {order.paidAt}</ErrorMessage>
                            ): (
                                <ErrorMessage variant='warning'>Not Paid</ErrorMessage>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ?
                                <ErrorMessage variant='info'>
                                    Your Order is Empty 
                                </ErrorMessage> :(
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) =>(
                                            <ListGroup.Item key ={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col >
                                                        <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} * {item.price} = Nrs. {(item.qty*item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }  
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>Nrs.{order.itemsPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippping:</Col>
                                    <Col>Nrs.{order.shippingPrice}</Col>

                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Nrs.{order.taxPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>Nrs.{order.totalPrice}</Col>

                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (

                            <ListGroup.Item>
                                {loadingPay && <Loader />}

                                {!sdkReady ? (
                                    <Loader />
                                   ) : (
                                        <PayPalButton 
                                        amount = {order.totalPrice}
                                        onSuccess = {successPaymentHandler}
                                        />
                                    )
                                }

                            </ListGroup.Item>

                            )}
                            
                        </ListGroup>
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDeivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className = 'btn btn-block'
                                    onClick = {deliverHandler}
                                >
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default OrderPage
