import React, { useState, useEffect } from 'react';
import './styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from './../../redux/Cart/cart.selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveOrderHistory } from './../../redux/Orders/orders.actions';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { clearCart } from '../../redux/Cart/cart.actions';
import SimpleDialog from '../Dialog';
import { Helmet } from 'react-helmet';

const initialAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const CodDetails = () => {

  const { total, itemCount, cartItems } = useSelector(mapState);
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch();
  const history = useHistory();
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if (itemCount < 1 && !open) {
      history.push('/dashboard');
    }
  }, [itemCount, history, open]);

  const handleClose = (value) => {
    setOpen(false);
    //console.log(value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleShipping = evt => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };

  const handleFormSubmit = async evt => {
    evt.preventDefault();

    if (
      !shippingAddress.line1 || !shippingAddress.city ||
      !shippingAddress.state || !shippingAddress.postal_code ||
      !shippingAddress.country
    ) {
      return;
    }
    clearCart();
    const configOrder = {
      orderTotal: total,
      paymentMethod: {
        type: "COD"
      },
      orderStatus: "Processing",
      recipientName: recipientName,
      recipientPhone: recipientPhone,
      recipientEmail: recipientEmail,
      shippingAddress: shippingAddress,
      orderItems: cartItems.map(item => {
        const { documentID, productThumbnail, productName,
          productPrice, quantity, size, colour, discount, discountedPrice } = item;

        return {
          documentID,
          productThumbnail,
          productName,
          productPrice,
          quantity,
          size,
          colour,
          discount,
          discountedPrice
        };
      })
    }

    dispatch(
      saveOrderHistory(configOrder)
    );
    handleOpen();
  };

  return (
    <div className="paymentDetails">
      <Helmet>
        <title>Rediva | COD </title>
      </Helmet>
      <form onSubmit={handleFormSubmit}>
        <SimpleDialog open={open} onClose={handleClose} text={"Order Placed Successfully <br> Thankyou For Shopping with us."} />
        <div className="group">
          <h1>
            Shipping Details
          </h1>

          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={evt => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />
          <FormInput
            required
            placeholder="Recipient Phone"
            name="recipientPhone"
            handleChange={evt => setRecipientPhone(evt.target.value)}
            value={recipientPhone}
            type="tel"
          />
          <FormInput
            required
            placeholder="Recipient Email"
            name="recipientEmail"
            handleChange={evt => setRecipientEmail(evt.target.value)}
            value={recipientEmail}
            type="email"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={evt => handleShipping(evt)}
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={evt => handleShipping(evt)}
            value={shippingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={evt => handleShipping(evt)}
            value={shippingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={evt => handleShipping(evt)}
            value={shippingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={evt => handleShipping(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown whitelist={["IN"]}
              required
              onChange={val => handleShipping({
                target: {
                  name: 'country',
                  value: val
                }
              })}
              value={shippingAddress.country}
              valueType="short"
            />
          </div>

        </div>
        <Button type="submit">
          Confirm Order
        </Button>
      </form>
    </div>

  );
}
export default CodDetails;