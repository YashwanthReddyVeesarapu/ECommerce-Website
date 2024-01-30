import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
  handleSize,
} from "./../../../redux/Cart/cart.actions";
import { Link } from "react-router-dom";
import { Select, MenuItem, InputLabel, Skeleton } from "@mui/material";

const Item = (product) => {
  const dispatch = useDispatch();
  const [imgLoaded, setImgsLoaded] = useState(false);
  const {
    productName,
    productThumbnail,
    productPrice,
    discountedPrice,
    productSize,
    quantity,
    size,
    colour,
    documentID,
    variantID,
    adaptiveThumbnails,
  } = product;

  const [rsize, setSize] = useState(size ? size : "");

  const handleRemoveCartItem = (variantID) => {
    dispatch(
      removeCartItem({
        variantID,
      })
    );
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product, size, colour));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  const handleSizes = (e) => {
    const s = e.target.value;
    setSize(s);
    passSize(s, product);
  };

  const passSize = (s, product) => {
    dispatch(handleSize(s, product));
  };

  useEffect(() => {
    const loadImage = (productThumbnail) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = productThumbnail;

        loadImg.onload = () =>
          setTimeout(() => {
            resolve(productThumbnail);
          });

        loadImg.onerror = (err) => reject(err);
      });
    };
    loadImage(productThumbnail)
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("err", err));
  }, []);

  if (
    Object.entries(adaptiveThumbnails.map)[
      Object.keys(adaptiveThumbnails.map).indexOf(colour)
    ] == null
  )
    return null;

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <Link to={`/product/${documentID}`}>
              {imgLoaded ? (
                <img
                  alt="cart item image"
                  src={
                    Object.entries(adaptiveThumbnails.map)[
                      Object.keys(adaptiveThumbnails.map).indexOf(colour)
                    ][1]
                  }
                  onLoad={() => setImgsLoaded(true)}
                />
              ) : (
                <Skeleton className="thumb" variant="rect" />
              )}
            </Link>
          </td>
          <td>{productName}</td>
          <td>
            <div>
              <InputLabel>Size</InputLabel>
              <Select required value={rsize} onChange={handleSizes}>
                {productSize
                  .map((name, value) => ({ name: name, value: value }))
                  .map((item) => (
                    <MenuItem key={item.value} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            {colour}
          </td>
          <td>
            <span className="qtyBtn" onClick={() => handleReduceItem(product)}>
              &nbsp;{`-`}&nbsp;
            </span>
            <span className="qty">&nbsp; {quantity} &nbsp;</span>
            <span className="qtyBtn" onClick={() => handleAddProduct(product)}>
              &nbsp;{`+`}&nbsp;
            </span>
          </td>

          {discountedPrice === 0 ? (
            <td>{productPrice}</td>
          ) : (
            <td>&#x20b9;{discountedPrice}</td>
          )}
          <td align="center">
            <span
              className="cartBtn remove"
              onClick={() => handleRemoveCartItem(variantID)}
            >
              Remove
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
