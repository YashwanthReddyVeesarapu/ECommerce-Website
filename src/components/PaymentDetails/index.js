import React, { useState, useEffect } from 'react';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from './../../Utils';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from './../../redux/Cart/cart.selectors';
import { saveOrderHistory } from './../../redux/Orders/orders.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { CircularProgress } from '@material-ui/core';
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



const PaymentDetails = () => {
  const history = useHistory();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [txnid, setTxnID] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [paymentID, setPaymentID] = useState('');


  const name = cartItems.map(item => item.productName).toString();

  const ordID = () => {
    var ord = JSON.stringify(Math.random() * 100000);
    var i = ord.indexOf('.');
    ord = 'RLINV' + ord.substr(0, i);
    setTxnID(ord);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'bolt'
    script.src = 'https://checkout-static.citruspay.com/bolt/run/bolt.min.js'
    document.body.appendChild(script);
    window.scrollTo(0, 0);
    ordID();
  }, []);



  const handleClose = (value) => {
    setErrorOpen(false);
    setStatusOpen(false);
  };
  const handleOpen = (x) => {
    if (x === 1)
      setErrorOpen(true);
    if (x === 0)
      setStatusOpen(true);
  };


  function payumoney() {
    //Create a Data object that is to be passed to LAUNCH method of Bolt
    var pd = {
      key: '',
      txnid: txnid,
      amount: total,
      firstname: recipientName,
      email: recipientEmail,
      phone: recipientPhone,
      productinfo: name,
      surl: 'https://rediva-lifestyle.web.app/dashboard',
      furl: 'https://rediva-lifestyle.web.app/cart',
      hash: ''
    }


    // Data to be Sent to API to generate hash.
    let data = {
      'txnid': pd.txnid,
      'email': pd.email,
      'amount': pd.amount,
      'productinfo': pd.productinfo,
      'firstname': pd.firstname
    }
    // API call to get the Hash value
    apiInstance.post('/payment/payumoney', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
    }).then(res => {
      const data = res.data;
      pd.hash = data.hash;
      pd.key = data.key;

      redirectToPayU(pd);
    })
    //  .then(function (a) {
    //     return a.json;

    //  })
    //  .then(function (json) {
    //      pd.hash = json['hash']
    //      //  With the hash value in response, we are ready to launch the bolt overlay.
    //     //Function to launch BOLT   

    //     //display();
    //     console.log(pd);
    //  });

  }




  function redirectToPayU(pd) {
    //use window.bolt.launch if you face an error in bolt.launch
    setLoading(false);
    window.scroll(0, 0);
    window.bolt.launch(pd, {
      responseHandler: function (BOLT) {
        apiInstance.post('/payment/payumoney/response', {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: BOLT.response
        })
          .then(res => {
            //setPaymentResponse(res)
            //console.log(res.data);
            if (res.data !== "err") {
              handleOpen(0);
              setStatus(res.data.status);
              setPaymentID(res.data.txnid);
              const configOrder = {
                orderTotal: total,
                paymentMethod: {
                  type: 'Prepaid',
                  mode: res.data.mode,
                  status: res.data.status,
                  txnid: res.data.txnid,
                  amount: res.data.amount,
                  productinfo: res.data.productinfo,
                  email: res.data.email,
                  mihpayid: res.data.mihpayid
                },
                orderStatus: (res.data.status ? res.data.status : 'Pending'),
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
              // window.fbq('track', 'Purchase', { currency: "INR", value: total });

            }
            else
              handleOpen(1);  //ALERT {1 = Error, 0 = Status}
          })
        // .then(function (json) {
        //   console.log(json);
        //  });
      },
      catchException: function (response) {
        //console.log(response)
        // the code you use to handle the integration errors goes here
        // Make any UI changes to convey the error to the user
      }
    });
  }


  useEffect(() => {
    if (itemCount < 1) {
      history.push('/dashboard');
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
    setLoading(true);
    payumoney();
  };
  if (loading)
    return (
      <div className='loading'>
        <CircularProgress color="inherit" style={{ marginTop: "calc(50vh - 20px)", marginLeft: "calc(50vw - 20px)" }} />
      </div>
    )
  else
    return (

      <div className="paymentDetails">
        <Helmet>
          <title>Rediva | Payment </title>

        </Helmet>
        <SimpleDialog open={errorOpen} onClose={handleClose} text={"Sorry... <br />Payment FAILED, Retry payment again."} />
        <SimpleDialog open={statusOpen} onClose={handleClose} text={`STATUS <br />Payment ${status !== '' ? status : 'Not Yet initiated'} <br /> ${paymentID !== '' ? `Transaction ID : ${paymentID}` : 'Continue ..'}`} />
        <form title="Address_form" onSubmit={handleFormSubmit}>

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
            Pay Now
          </Button>

        </form>
      </div>
    );
}

export default PaymentDetails;