import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutSteps from '../../components/CheckoutSteps/checkoutsteps.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { createOrder } from '../../reducers/order/order.action';
import OrderTypes from '../../reducers/order/order.type';


function OrderPlace({history}) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const orderCreate = useSelector(state => state.orderCreate)
    const {success, order, error} = orderCreate

    const totalItemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
    const shippingPrice = (totalItemsPrice >100? 0: 10).toFixed(2)
    const taxPrice = (totalItemsPrice * 0.081).toFixed(2)
    const totalPrice = Number(Number(totalItemsPrice) + Number(shippingPrice) + Number(taxPrice))

    useEffect(() =>{
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({type: OrderTypes.ORDER_CREATE_RESET})
        }
    }, [success, history])

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : totalItemsPrice,
            shippingPrice: shippingPrice,
            taxPrice : taxPrice,
            totalPrice : totalPrice
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'   '} {cart.shippingAddress.postalCode}
                                {'   '} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {cart.cartItems.length === 0 ?
                                <ErrorMessage variant='info'>
                                    Your Cart is Empty 
                                </ErrorMessage> :(
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) =>(
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
                                    <Col>Nrs.{totalItemsPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippping:</Col>
                                    <Col>Nrs.{shippingPrice}</Col>

                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Nrs.{taxPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>Nrs.{totalPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={cart.cartItems.length===0}
                                onClick = {placeOrder}
                                >Place Your Order
                                
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPlace
