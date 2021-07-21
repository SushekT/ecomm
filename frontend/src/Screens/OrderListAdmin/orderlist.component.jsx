import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { listOrders } from '../../reducers/order/order.action'

function OrderListPage({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading,error,orders } = orderList

    const user = useSelector(state => state.userLogin)
    const {userInfo } = user
    console.log(orders)
    useEffect(() =>{

        if (userInfo && userInfo.isAdmin){

            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

   
    return (
        <div>
            <h1>Orders</h1>
            {loading ?
           (<Loader />) :
            error ?
            (<ErrorMessage variant='danger'>{error}</ErrorMessage>) :
            (
                
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>Total</th>
                                <th>PAID STATUS</th>
                                <th>DELIVERY STATUS</th>
                                <th>Action</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.users && order.users.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0,10) 
                                    ):
                                    (
                                        <i className='fas fa-check' style={{color:'red'}}></i>    
                                    )}
                                    </td>
                                    <td>{order.isDelivered ? (
                                        order.deliveredAt.substring(0,10) 
                                    ):
                                    (
                                        <i className='fas fa-check' style={{color:'red'}}></i>    
                                    )}
                                    </td>
                                
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                            Details
                                            </Button>
                                        </LinkContainer>
                                    
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
               
            )    
        }

        </div>
    )
}

export default OrderListPage
