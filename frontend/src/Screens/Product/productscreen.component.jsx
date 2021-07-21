import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'

import Rating from '../../components/Rating/Rating.comonent'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'

import {useSelector, useDispatch } from 'react-redux'
import {createProductReview, listDetailProduct} from '../../reducers/product_detail/product._detail.action'
import ProductDetailTypes from '../../reducers/product_detail/product._detail.type'

function ProductPage({match, history}) {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { product, error, loading } = productDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, loading: loadingProductReview, success: successProductReview } = productReviewCreate
   
    useEffect(()=> {

        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type: ProductDetailTypes.PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listDetailProduct(match.params.id))
       
    },[dispatch, successProductReview, match])
    const addToCardHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment
            }
        ))

    }
    return (
        
        <div>
         
            <Link to='/' className="btn btn-dark my-3">Go Back</Link>
            {loading ? <Loader /> : error? 
                    <ErrorMessage variant={'danger'} key={'danger'} >
                        {error}
                    </ErrorMessage> :
                    (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid /> 
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value = {product.rating} text = {`${product.numReviews} Reviews`} color ={'#f8e825'}/>
                                        </ListGroup.Item>  
                                        <ListGroup.Item>
                                            <h4> Price: Nrs. {product.price}</h4>
                                        </ListGroup.Item> 
                                        <ListGroup.Item>
                                            <h5> Description: </h5>{product.description}
                                        </ListGroup.Item> 
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                {product.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Stock:
                                                </Col>
                                                <Col>
                                                {product.countInStocks > 0 ?
                                                    'Stock'
                                                :
                                                    'Out Of Stock'
                                            }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStocks > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Quantity
                                                    </Col>
                                                    <Col xs = "auto" className = 'my-1'>
                                                        <Form.Control as = "select" value = {qty} onChange={e=> setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStocks).keys()].map(m =>(
                                                                    <option key={m+1} value= {m+1}>{m+1}</option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Row>
                                            <Button className="btn-block" type="button" onClick = {addToCardHandler} disabled={product.countInStock === 0}> Add to Cart</Button>
                                            </Row> 
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <ErrorMessage variant='info'>No Reviews</ErrorMessage>}
                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'/>
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>

                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a Review</h4>
                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <ErrorMessage variant='success'>Review Submitted</ErrorMessage>}
                                            {errorProductReview && <ErrorMessage variant='danger'>{errorProductReview}</ErrorMessage>}
                                            {userInfo ?(
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>Poor</option>
                                                            <option value='2'>Fair</option>
                                                            <option value='3'>Good</option>
                                                            <option value='4'>Very Good</option>
                                                            <option value='5'>Excellent</option>           
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                        as = 'textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        
                                                        >
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button 
                                                    disabled = {loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                    >
                                                        Comment
                                                    </Button>
                                                </Form>
                                            ) : (
                                                <ErrorMessage variant='info'>You are not Logged in<br />
                                                    Please <Link to='/login'>Login</Link> To Write a Review.
                                                </ErrorMessage>
                                            )
                                            }
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                            )
                    }
           
        </div>
    )
}

export default ProductPage;
