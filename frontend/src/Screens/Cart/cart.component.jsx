import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { addToCart, removeFromCart } from '../../reducers/cart/cart.action'

function CartPage({match, history, location}) {
    const productId = match.params.id
    const qty= location.search ? location.search.split('=')[1] : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log( cartItems)
    useEffect(()=> {

        if (productId){
            dispatch(addToCart(productId, qty))
        } else{

        }
    }, [dispatch,productId, qty])

    const removeCartItem = (id) =>{
       dispatch(removeFromCart(id))
    }
     const checkOutHandler = () =>{
         history.push('/login?redirect=shipping')
     }
    


    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ?(
                        <ErrorMessage variant='info'>
                            Your Cart is Empty <Link to='/'>Go Back</Link>
                        </ErrorMessage>
                    ):
                    (
                        <ListGroup variant='flush'>
                            { cartItems.map(item =>(
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3}>
                                        <Form.Control as = "select" value = {item.qty} onChange={e=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStocks).keys()].map(m =>(
                                                        <option key={m+1} value= {m+1}>{m+1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button type='button' variant='light' onClick = {() => removeCartItem(item.product)}>
                                                <i className = "fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SubTotal {cartItems.reduce((accumulator, item) =>
                            accumulator + item.qty, 0)
                            } Quantity</h3>

                            <h4>Total Nrs. {cartItems.reduce((accumulator, item) =>
                            accumulator + item.qty * item.price, 0).toFixed(2)
                            } </h4>
                        </ListGroup.Item>
                        <ListGroup>
                            <Button type='button' className='btn-block' disabled= {cartItems.length === 0}
                                onClick = {checkOutHandler}
                            >
                                Proceed To CheckOut
                            </Button>
                        </ListGroup>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default CartPage
