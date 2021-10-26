import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './../../components/OrderDetails';

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal, shippingAddress, paymentMethod } = orderDetails;


  console.log(paymentMethod);


  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);

  if (!shippingAddress || !orderTotal)
    return null;

  return (
    <div>

      <h3>
        Order ID:
        <h2>#{orderID}</h2>
      </h3>

      <OrderDetails order={orderDetails} />
      <div style={{ paddingLeft: '5vw', fontSize: '2vh' }} >
        Payment Method
        <ul style={{ textAlign: 'left' }} >
          <li>{paymentMethod.type}</li>
        </ul>

        Shipping Address
        <ul style={{ textAlign: 'left' }} >
          <li>{shippingAddress.line1}</li>
          <li>{shippingAddress.line2}</li>
          <li>{shippingAddress.city}</li>
          <li>{shippingAddress.state}</li>
          <li>{shippingAddress.postal_code}</li>
        </ul>
      </div>

      <h3>
        Total: &#x20b9;{orderTotal}
      </h3>

    </div>
  )

}

export default Order;