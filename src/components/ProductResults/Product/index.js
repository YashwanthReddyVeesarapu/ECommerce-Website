import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './../../forms/Button';
import { useDispatch } from 'react-redux';
import { addProduct } from './../../../redux/Cart/cart.actions';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import click from './../../../assets/click.wav';

const useStyles = makeStyles((theme) => ({
  thumb: {
    display: 'flex',
    minHeight: '200px',
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',

    "@media (max-width: 980px)": {
      maxHeight: '40vh'
    },
    "@media (max-width: 580px)": {
      minHeight: 230,
      height: 'auto',

    }
  },
  img: {
    overflow: 'hidden',
    margin: 'auto',
    display: 'block',
    height: 'auto',
    width: '100%',
    maxHeight: '220px',
    objectFit: 'cover',

    "@media (max-width: 980px)": {
      minHeight: '30vh'
    },
    "@media (max-width: 580px)": {
      maxHeight: '40vh'

    }
  }
}));

const Product = (product) => {
  const classes = useStyles();
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [timeout, setTimer] = useState(false);
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productSize,
    discountedPrice
  } = product;

  var audio = new Audio(click);


  useEffect(() => {
    const loadImage = productThumbnail => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = productThumbnail

        loadImg.onload = () =>
          setTimeout(() => {
            resolve(productThumbnail)
          })

        loadImg.onerror = err => reject(err)
      })
    }
    (loadImage(productThumbnail))
      .then(() => setImgsLoaded(true))
      .catch(err => console.log("err", err))
  }, [])

  const dispatch = useDispatch();
  const history = useHistory();

  if (!documentID || !productThumbnail || !productName || !productSize ||
    typeof productPrice === 'undefined') return null;



  const configAddToCartBtn = {
    type: 'button'

  };

  // const handleAddToCart = (product) => {
  //   if (!product) return;
  //   dispatch(
  //     addProduct(product)
  //   );
  //   history.push('/cart');
  // };


  function redirect() {

    audio.play();
    sessionStorage.setItem('scrool', window.scrollY)
    history.push(`/product/${documentID}`)

  }



  setTimeout(() => {
    setTimer(true)
  }, 100);


  return (

    <div className={timeout ? "product-next" : "product"} onClick={redirect} >
      <div className={classes.thumb}>
        {imgsLoaded ? (
          <img className={classes.img} src={productThumbnail} alt={productName} onLoad={() => setImgsLoaded(true)} />

        ) : (
          // <Skeleton variant="rect" width="100%" height={250} />
          <Skeleton className={classes.thumb} variant="rect" />
        )}
      </div>

      <div className="details">
        <ul>
          <li>
            {imgsLoaded ? (
              <span className="name">
                {productName}

              </span>)
              : <Skeleton style={{ marginLeft: '25%', marginRight: '25%' }} height="30px" variant="text" />}
          </li>
          {imgsLoaded ? (
            <li>

              {discountedPrice === 0 ?
                <span className="price">
                  &#x20b9;{productPrice}
                </span> :
                <span className="price">
                  &#x20b9;{discountedPrice}&nbsp;
                  <s>&#x20b9;{productPrice} </s>
                </span>}

            </li>) :
            <Skeleton style={{ marginLeft: '30%', marginRight: '30%' }} height="20px" variant="text" />
          }
          {/* {imgsLoaded ? (
            <li>
              <div className="addToCart">
                <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                  Add to cart
                </Button>
              </div>
            </li>
          ) :
            <Skeleton style={{ borderRadius: 30, marginTop: 15 }} height='30px' variant="rect" />} */}
        </ul>
      </div>

    </div>
  );
};


export default Product;