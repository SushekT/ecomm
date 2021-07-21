import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { createProducts, deleteProducts, listProducts } from '../../reducers/product/product.action'
import ProductListTypes from '../../reducers/product/product.type'
import Paginate from '../../components/Paginate/paginate'

function AdminProductListPage({history}) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading,error, products, pages, page } = productList

    const user = useSelector(state => state.userLogin)
    const {userInfo } = user

    const productDelete = useSelector(state => state.productDelete)
    const {success: deleteSuccess, loading: loadingDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {success: createSuccess, loading: loadingCreate, error: errorCreate, product: createProduct } = productCreate

    let keyword = history.location.search

    useEffect(() =>{
        dispatch({type: ProductListTypes.PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin){

            history.push('/login')
        }

        if(createSuccess){
            history.push(`/admin/product/${createProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }
    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, createProduct, keyword])

    const deleteHandler =(id) =>{

        if (window.confirm('Are you sure you want to delete>')){

            dispatch(deleteProducts(id))
        }
    }

    const createProductHandler =() =>{

        dispatch(createProducts())

    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col md={10}>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right' md={2}>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'> Create Product</i>
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}

            {loadingCreate && <Loader />}
            {errorCreate && <ErrorMessage variant='danger'>{errorCreate}</ErrorMessage>}

            {loading ?
           (<Loader />) :
            error ?
            (<ErrorMessage variant='danger'>{error}</ErrorMessage>) :
            (
                <div>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                   
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' ></i> 
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                            <i className='fas fa-trash' ></i> 
                                            </Button>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true}/>
                </div>
                    
               
            )    
        }

        </div>
    )
}

export default AdminProductListPage

