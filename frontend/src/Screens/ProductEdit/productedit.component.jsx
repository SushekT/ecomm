import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'

import FormContainer from '../../components/Form/form.component'
import { listDetailProduct } from '../../reducers/product_detail/product._detail.action'
import ProductListTypes from '../../reducers/product/product.type'
import { updateProducts } from '../../reducers/product/product.action'
import axios from 'axios'

function ProductEditPage({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStocks, setCountInStocks] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: updateLoading, error: updateError,success: updateSuccess } = productUpdate
    
    

    const dispatch = useDispatch()
    useEffect(()=>{
        
        if (updateSuccess) {
            dispatch({type: ProductListTypes.PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{

            if(!product.name || product._id !== Number(productId)){
                     dispatch(listDetailProduct(productId))
                 }else{
                     
                     setName(product.name)
                     setPrice(product.price)
                     setBrand(product.brand)
                     setCategory(product.category)
                     setCountInStocks(product.countInStocks)
                     setDescription(product.description)
                     setImage(product.image)
                 }
        }
        
        
    },[dispatch, productId, history, product])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProducts({
            _id : productId,
            name,
            price,
            image,
            brand,
            category,
            countInStocks,
            description
        }))
       
    }

    const uploadFileHandler = async (e) =>{
        console.log(e)
        const file = e.target.files[0]
        const formData = new FormData()
        
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)
   
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }
    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {updateLoading && <Loader />}
                {updateError &&<ErrorMessage variant='danger'>{updateError}</ErrorMessage> }
                {loading ? <Loader />:
                    error ?
                    <ErrorMessage variant='danger'>{error}</ErrorMessage>
                :(

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Your UserName'
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Enter Your Price'
                        value = {price}
                        onChange = {(e) => setPrice(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Upload Your Image</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Image'
                        value = {image}
                        onChange = {(e) => setImage(e.target.value)}>
                            
                        </Form.Control>

                        <Form.File
                            id='image-file'
                            label='Upload Image'
                            onChange={uploadFileHandler}
                            custom
                        >

                        </Form.File>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Your Brand'
                        value = {brand}
                        onChange = {(e) => setBrand(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Your Stock</Form.Label>
                        <Form.Control 
                        type='number'
                        placeholder='Enter Your Stocks Number'
                        value = {countInStocks}
                        onChange = {(e) => setCountInStocks(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Your Category'
                        value = {category}
                        onChange = {(e) => setCategory(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter Your Description'
                        value = {description}
                        onChange = {(e) => setDescription(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>


                   

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                )
            }
            </FormContainer>
    
        </div>
    )
        
}

export default ProductEditPage
