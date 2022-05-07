import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCartData } from "./cart.actions";
import { handleCartData } from "./cart.helpers";
import cartTypes from "./cart.types";

export function* fetchCartData(userId) {
    try {
        const res = yield call(handleCartData, userId)
        const snapshot = yield res.get();

        yield put(
            getCartData({
                ...snapshot.data()
            })
        )
    }
    catch (err) {
        console.log(err)
    }
}

export function* onGetCartData() {
    yield takeLatest(cartTypes.GET_CART_DATA, fetchCartData)
}

export default function* cartSagas() {
    yield all([
        call(onGetCartData)
    ])
}