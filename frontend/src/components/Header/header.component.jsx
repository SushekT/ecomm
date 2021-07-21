import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../reducers/users/user.action'
import SearchBox from '../SearchBox/search.component'
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const {userInfo} = userLogin
    const logoutHandler = () =>{
        dispatch(logout())
    }
    return (
        <div>
            <header>
                <Navbar bg="dark"variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>ProShop</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchBox />
                        <Nav className="mr-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className = "fas fa-shopping-cart"></i>
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? 
                                <NavDropdown title ={userInfo.name} id='username'>
                                    <LinkContainer to ='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>:

                                <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className = "fas fa-user"></i>
                                        Log In
                                </Nav.Link>
                            </LinkContainer>
                                
                        }
                            {userInfo && userInfo.isAdmin &&(

                                <NavDropdown title ='Admin' id='adminmenu'>
                                    <LinkContainer to ='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to ='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to ='/admin/orders'>
                                        <NavDropdown.Item>Order List</NavDropdown.Item>
                                    </LinkContainer>
                                   
                                   
                                </NavDropdown>  
                            )}
                            
                        </Nav>
                        
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default Header;
