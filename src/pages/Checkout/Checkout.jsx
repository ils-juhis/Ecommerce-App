import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import MetaData from '../../components/MetaData';
import AddressDetailsForm from './AddressDetailsForm/AddressDetailsForm';
import ConfirmOrder from './ConfirmOrder/ConfirmOrder'
import PaymentDetails from './PaymentDetails/PaymentDetails'
import OrderSuccess from './OrderSuccess/OrderSuccess';
import { getUserAddress } from '../../store/actions/AuthActions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, StepContent } from '@mui/material';
import  './Checkout.scss'

const steps = ['Shipping', 'Review your order', 'Payment Details'];


export default function HorizontalNonLinearStepper() {
  const  userAddressReducer = useSelector(state=> state.userAddressReducer)
  const cartItemsListReducer = useSelector(state=>state.cartItemsListReducer)
  const [activeStep, setActiveStep] = React.useState(1);
  const [addressDetails, setAddressDetails] = useState({})
  const [orderDetails, setOrderDetails] = useState({products: [], totalPrice: 0, totalItems: 0})
  const [paymentDetails, setPaymentDetails] = useState({})
  const dispatch = useDispatch()


  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if(!isLastStep())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function _renderStepContent(step) {

    switch (step) {
      case 0:
        return <AddressDetailsForm  handleBack={handleBack} handleNext={handleNext}  addressDetails={addressDetails} setAddressDetails={setAddressDetails} />;
      case 1:
        return <ConfirmOrder handleBack={handleBack} handleNext={handleNext} orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>;
      case 2:
        return <PaymentDetails handleBack={handleBack} handleNext={handleNext} paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails}/>;
      default:
        return <div>Not Found</div>;
    }
  }

  
  useEffect(()=>{
    if(!userAddressReducer.userAdress){
      dispatch(getUserAddress())
    }
}, [])

useEffect(()=>{
  if(cartItemsListReducer?.cartItems?.cartItems){
    const data = cartItemsListReducer?.cartItems?.cartItems.filter((item)=> {
      if(item.quantity> item.product.stock)
        item.quantity = item.product.stock
      return item.product.stock !== 0
    })

    setOrderDetails(prev=>{
      return {...prev, products: data,
      totalItems: data.length,
      totalPrice: data.reduce((total, item)=>{
        return total + (item.quantity * item.product?.price);
      }, 0)
    }
  }) 
  }
},[cartItemsListReducer.cartItems])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeStep])

  return (
    <div className="container-xl px-4 checkout">
      <Box sx={{ width: '100%', my:5 }}>
        <MetaData title={`Checkout | BAZZAR.com`} />
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)} className='shadow-sm bg-light position-sticky  w-100'>
                {label}
              </StepButton>
              <StepContent className='ps-lg-5' transitionDuration={300} TransitionProps={{mountOnEnter:false, unmountOnExit: false}}>
                <div className='pt-4'>
                  {_renderStepContent(activeStep)}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}