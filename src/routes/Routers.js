import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import ProtectedRoute from './ProtectedRoute'
import Account from '../pages/Account/Account'
import Cart from '../pages/Cart/Cart'
import Wishlist from '../pages/Wishlist/Wishlist'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import LoginSignup from '../pages/LoginSignup/LoginSignup'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import NotFound from '../pages/NotFound/NotFound'

function Routers() {
    const dispatch = useDispatch() 
    // const [stripeAPIKey, setStripeAPIKey] = useState('')

    // async function getStripeAPIKey (){

    //     const {data} = await axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/stripeapikey', 
    //     { withCredentials: true }
    //   )
    //     setStripeAPIKey(data.stripeApiKey)
    //   }
    
    //   useEffect(()=>{
    //     dispatch(checkAuthStatus())
    //     getStripeAPIKey()
    //   },[])

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout/> } >
            <Route index element={<Home />} />
            <Route path="products" element={<Products/> }/>
            <Route path="product/:categorySlug/:productNameSlug/:id" element={<ProductDetails/> }/>
            <Route path="contact" element={<Contact/> } />
            <Route path="about" element={<About/> } />

            <Route path="account" element={< ProtectedRoute/> } >
                <Route index element={<Account/> } />
                <Route path='cart' element={<Cart/> } />
                <Route path='wishlist' element={<Wishlist/> } />
                <Route path='orders' element={<Orders/> } />
                <Route path='profile' element={<Profile/> } />
            </Route>
            <Route path='checkout' element={<ProtectedRoute/> } >
                {/* {
                stripeAPIKey &&
                <Route index element={<Elements stripe={loadStripe(stripeAPIKey)}><Checkout/> </Elements>} />
                } */}
            </Route>
            </Route>

            <Route path="reset-password/:token" element={<ResetPassword/> } />
            <Route path="forgot-password" element={<ForgotPassword/> }/>
            <Route path="login" element={<LoginSignup type="login"/> }/>
            <Route path="signup" element={<LoginSignup type="signup"/> }/>
            <Route path="*" element={<NotFound/> } />
        </Routes>
    </>
  )
}

export default Routers