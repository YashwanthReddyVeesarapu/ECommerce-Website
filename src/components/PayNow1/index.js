import React, { useState, useEffect } from 'react';
import './styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from './../../redux/Cart/cart.selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveOrderHistory } from './../../redux/Orders/orders.actions';
import { apiInstance } from './../../Utils';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { clearCart } from '../../redux/Cart/cart.actions';

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

const Payu = () => {
    const { total, itemCount, cartItems } = useSelector(mapState);
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const dispatch = useDispatch();
    const history = useHistory();
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    useEffect(() => {
        if (itemCount < 1) {
            history.push('/cart');
        }
    }, [itemCount]);




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
        const configOrder = {
            orderTotal: total,
            recipientName: recipientName,
            recipientPhone: recipientPhone,
            recipientEmail: recipientEmail,
            shippingAddress: shippingAddress,
            orderItems: cartItems.map(item => {
                const { documentID, productThumbnail, productName,
                    productPrice, quantity, size } = item;

                return {
                    documentID,
                    productThumbnail,
                    productName,
                    productPrice,
                    quantity,
                    size
                };
            })
        }
        dispatch(
            saveOrderHistory(configOrder)
        );
    };




    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>

                <div className="group">
                    <h1>
                        Shipping Address
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
                        <CountryDropdown
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
                <Button type="submit" value="submit" >
                    Confirm Order
                </Button>
            </form>

        </div>
    )
}

export default Payu;
