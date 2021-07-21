import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from '../Rating/Rating.comonent'
import { Link } from 'react-router-dom'

function Product({product}) {
    const {_id, name, image, price, rating, numReviews } = product
    return (
        <div>
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${_id}`}>
                    <Card.Img src = {image} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${_id}`}>
                        <Card.Title as="div">
                            <h5>{name}</h5>
                        </Card.Title>
                    </Link>

                    <Card.Text as="div">
                        <div className="my-3">
                            <Rating value = {rating} text = {`${numReviews} Reviews`} color= {'#f8e825'}/>
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">
                        Nrs. {price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
