import React, {useState, useEffect} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import FormContainer from '../../components/Form/form.component'
import { savePaymentMethod } from '../../reducers/cart/cart.action'
import CheckoutSteps from '../../components/CheckoutSteps/checkoutsteps.component'

function PaymentPage({history}) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart


    const dispatch = useDispatch()
    const [payment, setPayment] = useState('PayPal')
    if (!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('ok')
        dispatch(savePaymentMethod(payment))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2  />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend' >Select Method </Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked 
                        onChange = {(e) => setPayment(e.target.value)}
                        > 

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit'>
                        Continue
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default PaymentPage;
