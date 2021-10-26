import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderHistory from '../../../components/OrderHistory'
import { getUserOrderHistory } from '../../../redux/Orders/orders.actions';


const mapState = ({ user, ordersData }) => ({
  ordersHistory: ordersData.orderHistory.data,
  currentUser: user.currentUser
});

const Orders = () => {
  const dispatch = useDispatch();
  const { ordersHistory, currentUser } = useSelector(mapState);


  useEffect(() => {
    if (currentUser.userRoles[0] === 'admin')
      dispatch(
        getUserOrderHistory('admin')
      )
  }, [])

  return (
    <div style={{ minHeight: 300 }}>
      <OrderHistory currentUser={currentUser.userRoles[0]} orders={ordersHistory} />
    </div>
  )
}

export default Orders
