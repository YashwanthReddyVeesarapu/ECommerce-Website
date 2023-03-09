import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { Grid, ButtonBase, Paper, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 70,
    paddingLeft: '22%',
    paddingRight: '22%',
    paddingTop: 40,
    "@media (max-width: 980px)": {
      padding: 0
    }
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    marginTop: 30,
    paddingTop: 0
  },
  image: {
    width: 150,
    height: 150,
    margin: "5px 0"

  },
  img: {
    objectFit: 'cover',
    height: 150,
    width: 150,
  },
  buttons: {
    marginRight: 0,
    marginLeft: 'auto',
  },


}));

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const OrderSummary = (product) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  const classes = useStyles();


  function loadImage(productThumbnail) {

    const loadImg = new Image()
    loadImg.src = productThumbnail

    return (loadImg);
  }

  // useEffect(() => {
  //   loadImage(productThumbnail)
  // })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className={classes.root}>
      <h1>
        Order Summary
      </h1>
      <Paper className={classes.paper}>

        <Grid container spacing={2}>

          <Grid item xs={12} sm container>
            {cartItems.map((item, pos) => (
              <Grid item container direction="row" spacing={2} key={pos} alignItems="center">
                <Grid item>
                  {loadImage(item.productThumbnail).onload ? <Skeleton className={classes.image} /> :
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="thumbnail" src={Object.entries(item.adaptiveThumbnails.map)[Object.keys(item.adaptiveThumbnails.map).indexOf(item.colour)][1]} />

                    </ButtonBase>
                  }
                </Grid>
                <Grid item xs align="left" >
                  <Typography gutterBottom variant="h5" >
                    {item.productName}
                  </Typography>
                  {item.discountedPrice ? <Typography variant="h6" gutterBottom>
                    &#x20b9;{item.discountedPrice}
                    <Typography variant="body1" color="textSecondary">
                      DISCOUNT : {item.discount}%
                    </Typography>
                  </Typography>
                    : <Typography variant="h6" gutterBottom>
                      &#x20b9;{item.productPrice}
                    </Typography>}

                  <Typography variant="body1" color="textSecondary">
                    SIZE : {item.size}
                  </Typography>

                  <Typography variant="body1" gutterBottom color="textSecondary">
                    QUANTITY : {item.quantity}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <br></br>
        <Grid container xm={12} direction="row" >
          <Typography variant="h3">
            &#x20b9;{total}/-
          </Typography>
          <ButtonGroup disableElevation className={classes.buttons} variant="contained" color="primary" >
            <Button size="large" color="secondary" onClick={() => history.push('/cod')} >
              COD
            </Button>
            <Button size="medium" onClick={() => history.push('/payment')}>
              PAY NOW
            </Button >
          </ButtonGroup>
        </Grid>
      </Paper>
    </div>
  )
}

export default OrderSummary;

