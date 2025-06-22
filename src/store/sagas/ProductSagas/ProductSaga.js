import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../../axios/axiosInstance";
import { GET_PRODUCT_LIST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS_FAIL } from "../../constant";
import { notify } from "../../../utils/notification";
import {logOut} from '../../../utils/helpers/logout'
import apiEndpoints from "../../../axios/api";


export const getProductListReq = async({data})=>{   
    let {resultPerPage, keyword, page, minPrice, maxPrice, rating, sortBy, category} = data;
    let categoryString='';
    category?.forEach((item, index)=>{
        categoryString+=`&category=${item}`
        
    })
    return axiosInstance.get(`${apiEndpoints.GET_PRODUCT_LIST_API}?${resultPerPage ? `resultPerPage=${resultPerPage}` : ''}${keyword ? `&keyword=${keyword}` : ''}${page ? `&page=${page}` : ''}${minPrice && minPrice!=200 ? `&price[gte]=${minPrice}` : ''}${maxPrice && maxPrice!=10000 ? `&price[lte]=${maxPrice}` : ''}${rating && rating!=0 ? `&rating[gte]=${rating}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${categoryString ? `${categoryString}` : ''}`)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* getProductList({data}){
    try{
        let result = yield call(getProductListReq, {data})
        if(result.statusCode === 200){
            yield put({ type: GET_PRODUCT_LIST_SUCCESS, payload: result});  
        } else{
            yield put({ type: GET_PRODUCT_LIST_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_PRODUCT_LIST_FAIL, message: error.message });
    }
}


export const getProductDetailsReq = async({data})=>{   
    return axiosInstance.get(`${apiEndpoints.GET_PRODUCT_DETAILS_API}/${data?.id}`)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);

            if (errors.response?.data.statusCode === 401)
                logOut()
            else if (errors.response?.data.statusCode === 409)
                notify('warning', errors?.response?.data?.error);
            else if ( errors.response?.status === 400 || errors.response?.status=== 404)
                notify('error', errors?.response?.data?.error);
            else
                notify('error', "Something went wrong");
            
            return errors
        })
}

function* getProductDetails({data}){
    try{
        let result = yield call(getProductDetailsReq, {data})

        if(result.statusCode === 200){
            yield put({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: result});  
        }else{
            yield put({ type: GET_PRODUCT_DETAILS_FAIL, message: result?.response?.data?.error});
        }
    }catch(error){
        yield put({ type: GET_PRODUCT_DETAILS_FAIL, message: error.message });
    }
}

function* productSaga(){
    yield takeLatest(GET_PRODUCT_LIST, getProductList)
    yield takeEvery(GET_PRODUCT_DETAILS, getProductDetails)
}

export default productSaga;