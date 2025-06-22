import { GET_PRODUCT_DETAILS, GET_PRODUCT_LIST } from "../../constant";

export function getProductList(data) {
    return {
        type: GET_PRODUCT_LIST,
        data
    };
}

export function getProductDetails(data) {
    return {
        type: GET_PRODUCT_DETAILS,
        data,
    };
}