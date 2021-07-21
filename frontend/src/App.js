import React from 'react'
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/header.component'
import Footer from './components/Footer/footer.component'  
import Homepage from './Screens/Homepage/Homepage.component'
import ProductPage from './Screens/Product/productscreen.component'
import CartPage from './Screens/Cart/cart.component'
import LoginPage from './Screens/Login/login.component'
import RegisterPage from './Screens/Register/register.component'
import ProfilePage from './Screens/Profile/profile.component'
import ShippingPage from './Screens/Shipping/Shipping.component'
import PaymentPage from './Screens/Payment/payment.component'
import OrderPlace from './Screens/OrderPlace/order.placecomponent'
import OrderPage from './Screens/OrderPage/orderpage.component'
import UserListPage from './Screens/UserList/userlist.component'
import UserEditPage from './Screens/UserEdit/useredit.component'
import AdminProductListPage from './Screens/AdminProductList/product.list.component'
import ProductEditPage from './Screens/ProductEdit/productedit.component'
import OrderListPage from './Screens/OrderListAdmin/orderlist.component'

function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
            <Route path='/' component= {Homepage} exact/>
            <Route path='/login' component= {LoginPage} />
            <Route path='/register' component= {RegisterPage} />
            <Route path='/profile' component= {ProfilePage} />
            <Route path='/payment' component= {PaymentPage} />
            <Route path='/placeorder' component= {OrderPlace} />
            <Route path='/order/:id' component= {OrderPage} />
            
            <Route path='/shipping' component= {ShippingPage} />
            <Route path='/product/:id' component= {ProductPage}/>
            <Route path='/cart/:id?' component= {CartPage}/>

            <Route path='/admin/userlist' component= {UserListPage} />
            <Route path='/admin/user/:id/edit' component= {UserEditPage} />
            <Route path='/admin/productlist' component= {AdminProductListPage} />
            <Route path='/admin/product/:id/edit' component= {ProductEditPage} />
            <Route path='/admin/orders' component= {OrderListPage} />
            
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
