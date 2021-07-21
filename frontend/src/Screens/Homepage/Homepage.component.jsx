import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../../reducers/product/product.action'
import Product from '../../components/Products/product.component'

import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'

import {useDispatch, useSelector} from 'react-redux'
import paginate from '../../components/Paginate/paginate'
import Paginate from '../../components/Paginate/paginate'
import ProductCarousel from '../../components/Caraousel/carousel.component'


function Homepage({history}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products, loading, error, page, pages} = productList
    let keyword = history.location.search 
    console.log(keyword)
    useEffect(() =>{
        
        dispatch(listProducts(keyword))
        
    },[dispatch, keyword, history])

    return (
       
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Latest Product</h1>
            <div>
            <Row>

                {
                    loading ? <Loader /> : error? 
                    <ErrorMessage variant={'danger'} key={'danger'} >
                        {error}
                    </ErrorMessage> :
                    products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={3}>
                            <Product key = {product._id} product={product} />
                        </Col>
                       
                    ))
                
                }
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}/>
            </div>

        </div>
    )
}

export default Homepage
