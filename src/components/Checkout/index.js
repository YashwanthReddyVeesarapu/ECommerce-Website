import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './styles.scss';

import Button from './../forms/Button';
import Item from './Item';
import SimpleDialog from '../Dialog';

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});




const Checkout = () => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  function check() {

    const isTrue = cartItems.every(element => {
      return element.size;
    });
    if (isTrue === true)
      history.push('/ordersummary')
    else
      handleClickOpen();

    //history.push('./dashboard')

  }


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const errMsg = 'You have no items in your cart.';
  return (
    <div className="checkout">
      <h1>
        Checkout
      </h1>
      <SimpleDialog open={open} onClose={handleClose} text={"What's the size? "} />

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>
                          Product
                        </th>
                        <th>
                          Name
                        </th>
                        <th>
                          Size/Color
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>
                          Price
                        </th>
                        <th>
                          Remove
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <h3>

                                    Total: &#x20b9;{total}
                                  </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr className="btns">
                                <td>
                                  <a >
                                    Add More Items
                                  </a>
                                  <Button onClick={() => history.goBack()}>
                                    Back
                                  </Button>
                                </td>
                                <td>
                                  <a >Checkout</a>
                                  <Button onClick={() => check()} >
                                    Next
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>
            {errMsg}
            <br></br>
            <br></br>
            <br></br>
            <a href="/#" onClick={() => history.push('/')}>Shop Now</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;