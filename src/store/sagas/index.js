import { all } from 'redux-saga/effects';
import productSaga from './ProductSagas/ProductSaga';
import categorySaga from './CategorySagas/CategorySaga';
import authSaga from './AuthSagas/AuthSaga';
import cartSaga from './CartSagas/CartSaga';

export default function* rootSaga() {
    return yield all([
        authSaga(),
        productSaga(),
        categorySaga(),
        cartSaga()
    ]);
}