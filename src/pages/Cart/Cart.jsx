import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemsList } from '../../store/actions/CartActions/CartActions'
import Loader from '../../components/Loader/Loader'
import './Cart.scss'
import CartItem from './CartItem/CartItem'
import emptyBox from '../../assets/images/empty-box.png'
import MetaData from '../../components/MetaData';
import { useNavigate } from 'react-router-dom'
import AlertModal from './AlertModal/AlertModal'
import _ from 'lodash'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItemsListReducer = useSelector(state=>state.cartItemsListReducer)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [alertModal, setAlertModal] = useState(false)

  useEffect(()=>{
    dispatch(getCartItemsList())
  },[])

  useEffect(()=>{
    if(cartItemsListReducer?.cartItems?.cartItems){
      const total = cartItemsListReducer?.cartItems?.cartItems.reduce((total, item)=>{
        if(item.product?.stock){
          return total+1;
        }
        return total;
      }, 0);

      setTotalItems(total)

      const totalPrice = cartItemsListReducer?.cartItems?.cartItems.reduce((total, item)=>{
        if(item.product?.stock < item.quantity){
          return total + (item.product?.stock * item.product?.price);
        }
        return total + (item.quantity * item.product?.price);
      }, 0);

      setTotalPrice(totalPrice)
    }
  },[cartItemsListReducer.cartItems])

  return (
    <div className='cart-container container-xl py-4 '>
      <MetaData title={`My Cart | BAZZAR.com`} />
      <div className="heading ">
        My Cart
      </div>
      {
        cartItemsListReducer.loading && !cartItemsListReducer.cartItems?.cartItems?.length ?
        <Loader/>:
        <div>
          <div className="d-flex flex-column flex-lg-row">
            <div className="cart-item-container">
              {
                cartItemsListReducer.cartItems?.cartItems?.map((item, index)=>{
                  return (
                    <CartItem item={item} key={index}/>
                  )
                })
              }
            </div>
            <div className="price-details shadow-sm ms-0 ms-lg-3">
              <div className="heading">Price Details</div>
              <div className="data">
                <div className="name">Price ({totalItems} items)</div>
                <div className="value">Rs. {totalPrice}</div>
              </div>
              <div className="data">
                <div className="name">Delivery Charge</div>
                <div className="value text-success"> Free</div>
              </div>
              <div className="data total">
                <div className="name">Total Amount</div>
                <div className="value">Rs. {totalPrice}</div>
              </div>
            </div>
          </div>
          {
            !cartItemsListReducer.cartItems?.cartItems?.length
            ?
            <div className='fw-bold text-center'>
              <img src={emptyBox} alt="" width={'150px'} className='me-3'/>
              <div>Cart is empty.</div>
            </div>
            :
            <div className='checkout shadow-sm'>
              <button onClick={()=>{ (_.filter(cartItemsListReducer.cartItems?.cartItems, i => i.product.stock === 0 || i.quantity > i.product.stock)).length ? setAlertModal(true) : navigate('/checkout')}}>Place Order</button>
            </div>
          }
        </div>
      }
      <AlertModal
            alertModal={alertModal} 
            setAlertModal={setAlertModal}
            name="account"
            onOK={()=>navigate('/checkout')}
        />
    </div>
  )
}

export default Cart