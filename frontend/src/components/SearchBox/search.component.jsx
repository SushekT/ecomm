import React, {useState, useEffect} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { listProducts } from '../../reducers/product/product.action'
import Homepage from '../../Screens/Homepage/Homepage.component'


function SearchBox() {
    const[keyword, setKeyword] = useState('')
    let history = useHistory()
    useEffect(() =>{
        if(keyword){
            history.push(`/?keyword=${keyword}`)
        }else{
            history.push(history.push(history.push.pathname))
        }

    },[keyword])

    const submitHandler = (e) => {
        e.preventDefault()
        setKeyword(e.target.value)
        
    }
    return (
        <Form inline style={{width:'25%', position:'absolute', top:'20px', left:'810px'}}>
            <Form.Control
                type='text'
                name='q'
                onChange ={(e) => submitHandler(e)} 
                onChange ={(e) => submitHandler(e)} 
                className='mr-sm-2 ml-sm-5'
                
            >

            </Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className = 'p-2'
                style={{position:'absolute', bottom:'2px', left:'360px'}}
            >
                Submit
            </Button>
            
        </Form>
    )
}

export default SearchBox
