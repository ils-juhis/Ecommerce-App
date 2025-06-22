import React, {useEffect, useState, useRef} from 'react'
import './AddressDetailsForm.scss'
import { ErrorMessage, Field, Form, Formik,} from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAddress } from '../../../store/actions/AuthActions/AuthActions'
import { CircularProgress } from '@mui/material'
import { Button } from '@mui/material'
import { addressUpdateValidation } from '../../../utils/schemas'

function AddressDetailsForm({handleBack, handleNext, addressDetails, setAddressDetails}) {
    const [editAddress, setEditAddress] = useState(false)
    const  userAddressReducer = useSelector(state=> state.userAddressReducer)
    const userAddressFormRef = useRef();

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!userAddressReducer.loading && !userAddressReducer.error){
            setAddressDetails(userAddressReducer.userAddress)
            setEditAddress(false)
        }else{
            userAddressFormRef.current?.resetForm()
        }
    }, [userAddressReducer.userAddress])

  return (
    <div className='address-details'>
        <Formik
            initialValues={{
                city: userAddressReducer.userAddress?.city,
                state: userAddressReducer.userAddress?.state,
                address: userAddressReducer.userAddress?.address,
                locality: userAddressReducer.userAddress?.locality,
                pinCode: userAddressReducer.userAddress?.pinCode
            }}
            enableReinitialize
            innerRef={(f) => (userAddressFormRef.current = f)}
            validationSchema={addressUpdateValidation}
            onSubmit= {(values, resetForm)=>{
                    dispatch(updateUserAddress(values))
                }}
            >
            {
                (formik)=>{
                    return (
                        <div className='mt-2 address-form'>
                            <div className="heading">
                                DELIVERY ADDRESS
                                <button className='edit-btn float-end' type='button' onClick={()=>{setEditAddress(prev => !prev); formik.resetForm()}}>{editAddress ? 'Cancel' : 'Edit'}</button>
                            </div>
                            <div className="content w-100">
                                <Form>
                                    <div>
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="field">
                                                <div className="field-name">Pin Code</div>
                                                <div className="field-box">
                                                    <Field type="tel" maxLength='6' name='pinCode' placeholder='Pin Code' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='pinCode'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                <div className="field-name">Locality</div>
                                                <div className="field-box">
                                                    <Field type="text" name='locality' placeholder='Locality'  disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='locality'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">Address</div>
                                            <div className="field-box address">
                                                <Field type="text" as='textarea' name='address' placeholder='Address' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='address'/>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="field">
                                                <div className="field-name">City</div>
                                                <div className="field-box">
                                                    <Field type="text" name='city' placeholder='City' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='city'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                <div className="field-name">State</div>
                                                <div className="field-box">
                                                    <Field type="text" name='state' placeholder='State'  disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='state'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                        {
                                            editAddress &&
                                            <button className='save-address-btn shadow-sm' type='submit' disabled={userAddressReducer.loading ||!formik.isValid || !formik.dirty}>
                                            {
                                                userAddressReducer.loading ?                                                            
                                                <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                                :
                                                <>{'Save and deliver here'}</>
                                            } 
                                            </button>  
                                        }
                                    </div>
                                </Form>
                                <div className='d-flex justify-content-between my-5'>
                                    <Button
                                    color="inherit"
                                    type="button"
                                    sx={{height: '44px'}}
                                    disabled={true}
                                    onClick={handleBack}
                                    >
                                    Back
                                    </Button>
                                    <button className='save-btn shadow-sm' type='button' onClick={handleNext} disabled={userAddressReducer.loading || !formik.isValid || editAddress}>
                                        Next
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

export default AddressDetailsForm