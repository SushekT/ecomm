import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader/loader.component'
import ErrorMessage from '../../components/ErrorMessage/errormessage.component'
import { deleteUsers, listUsers } from '../../reducers/users/user.action'

function UserListPage({history}) {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading,error,users } = userList

    const user = useSelector(state => state.userLogin)
    const {userInfo } = user

    const userDelete = useSelector(state => state.userDelete)
    const {loading: deleteLoading, success } = userDelete

    useEffect(() =>{

        if (userInfo && userInfo.isAdmin){

            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    }, [dispatch, history, success, userInfo])

    const deleteHandler =(id) =>{

        if (window.confirm('Are you sure you want to delete>')){

            dispatch(deleteUsers(id))
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {loading ?
           (<Loader />) :
            error ?
            (<ErrorMessage variant='danger'>{error}</ErrorMessage>) :
            (
                
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>Action</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{color:'green'}}></i> 
                                    ):
                                    (
                                        <i className='fas fa-check' style={{color:'red'}}></i>    
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' ></i> 
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                            <i className='fas fa-trash' ></i> 
                                            </Button>
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

export default UserListPage
