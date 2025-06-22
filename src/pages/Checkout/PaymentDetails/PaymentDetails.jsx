import React, {useState, useRef} from 'react'
import './PaymentDetails.scss'
import { ErrorMessage, Field, Form, Formik,} from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { paymentValidation } from '../../../utils/schemas'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {

    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  
function PaymentDetails({handleBack, handleNext, paymentDetails, setPaymentDetails}) {
    const  userAddressReducer = useSelector(state=> state.userAddressReducer)
    const [date, setDate] = useState(null);
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef()


  return (
    <div className='payment-details'>
        <Formik
            initialValues={{
                cardNumber: '',
                expiryDate: null,
                cvv: '',
            }}
            enableReinitialize
            validationSchema={paymentValidation}
            onSubmit= {(values, resetForm)=>{
                }}
            >
            {
                (formik)=>{
                    return (
                        <div className='mt-2 payment-form'>
                            <div className="heading">
                                PAYMENT DETAILS
                            </div>
                            <div className="content w-100">
                                {console.log(formik.values)}
                                <Form>
                                    <div>
                                        Check
                                        <div className="field">
                                            <div className="field-name">Card Number</div>
                                            <div className="field-box">
                                                <Field type="text" 
                                                    name='cardNumber' 
                                                    placeholder='XXXX XXXX XXXX XXXX'   
                                                    autoComplete='off'
                                                    value={formik.values.cardNumber.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                                                    onChange={(e)=>{
                                                        let string = e.target.value.replace(/\s/g, "")
                                                        if(string.length<17 && (/^[0-9]+$/).test(string))
                                                            formik.setFieldValue('cardNumber', string)
                                                    }}
                                                    />
                                                <div className="error">
                                                    <ErrorMessage name='cardNumber'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field ">
                                            <div className="field-name">Expiry Date</div>
                                            <div className="field-box date-input">
                                                <DatePicker 
                                                    showMonthYearPicker 
                                                    showIcon 
                                                    placeholderText='MM/YYYY' 
                                                    minDate={new Date()}
                                                    maxDate={new Date("2050-12-31")}
                                                    dateFormat="MM/yyyy" 
                                                    value={formik.values.expiryDate} 
                                                    selected={date} 
                                                    name='expiryDate' 
                                                    onChange={(date)=>{ setDate(date); formik.setFieldValue('expiryDate', moment(date).format('MM/YYYY'))}}
                                                    onBlur={()=>{formik.setFieldTouched('expiryDate', true); }}
                                                />
                                                <div className="error">
                                                    <ErrorMessage name='expiryDate'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                                <div className="field-name">CVV</div>
                                                <div className="field-box">
                                                    <Field 
                                                        type="text" 
                                                        maxLength='3' 
                                                        name='cvv' 
                                                        placeholder='XXX' 
                                                        className='me-2'  
                                                        autoComplete='off'
                                                        onChange={(e)=>{
                                                            if(e.target.value.length<4 && (/^[0-9]+$/).test(e.target.value))
                                                                formik.setFieldValue('cvv', e.target.value)
                                                        }}
                                                    />
                                                    <div className="error">
                                                        <ErrorMessage name='cvv'/>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </Form>
                                <div className='d-flex justify-content-between my-5'>
                                    <Button
                                    color="inherit"
                                    type="button"
                                    sx={{height: '44px'}}
                                    onClick={handleBack}
                                    >
                                    Back
                                    </Button>
                                    <button className='save-btn shadow-sm' type='submit' onClick={handleNext} disabled={userAddressReducer.loading || !formik.isValid}>
                                        Place order
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            </Formik>
        </div>
    )
}

export default PaymentDetails