import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  handleSaveOrder, handleGetUserOrderHistory,
  handleGetOrder, handleSetOrderStatus
} from './orders.helpers';
import { auth } from './../../firebase/utils';
import { clearCart } from './../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails } from './orders.actions';

import { apiInstance2 } from '../../Utils';

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );

  } catch (err) {
    //console.log(err);
  }
}


export function* onGetUserOrderHistoryStart() {
  yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};


export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps
    });
    yield put(
      clearCart()
    )

  } catch (err) {
    // console.log(err);
  }
};


export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    yield put(
      setOrderDetails(order)
    )

  } catch (err) {
    // console.log(err);
  }
}

export function* onSetOrderStatus() {
  yield takeLatest(ordersTypes.SET_ORDER_STATUS, setOrderStatus);
};


export function* setOrderStatus({ payload1, payload2, order }) {
  try {
    const timeStamp = new Date();
    yield handleSetOrderStatus({
      payload1, payload2, order,
      lastUpdated: timeStamp
    })
  } catch (err) {
    // console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onSetOrderStatus)
  ])
}