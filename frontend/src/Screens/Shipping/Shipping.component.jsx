import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import FormContainer from '../../components/Form/form.component'
import { saveShippingAddress } from '../../reducers/ShippingAddress/shipping.action'
import CheckoutSteps from '../../components/CheckoutSteps/checkoutsteps.component'

function ShippingPage({history}) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    console.log(cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping Form</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Your Address'
                        value = {address ? address : ''}
                        onChange = {(e) => setAddress(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Your City'
                        value = {city ? city : ''}
                        onChange = {(e) => setCity(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Your Postal Code'
                        value = {postalCode ? postalCode : ''}
                        onChange = {(e) => setPostalCode(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Your Country'
                        value = {country ? country : ''}
                        onChange = {(e) => setCountry(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Button type='submit' variant="primary">
                Continue
            </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingPage
