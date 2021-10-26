import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, ButtonBase, Paper, Typography, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { setOrderDetails } from './../../redux/Orders/orders.actions';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 40,
    paddingTop: 10,
    paddingBottom: 10,
    "@media (max-width: 980px)": {
      padding: 10
    }
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    marginBottom: '2vh'
  },
  image: {
    width: 'auto',
    height: 200,
    "@media (max-width: 980px)": {
      width: 150,
      height: 150,
    }
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }


}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser.userRoles
});

const OrderDetails = ({ order }) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(order.orderStatus);
  const params = new URLSearchParams(window.location.search);
  const auth = params.get('auth');

  useEffect(() => {
    return () => {
      dispatch(
        setOrderDetails({})
      );
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(orderItems) && orderItems.length === 0)
      setLoading(false)
    window.scrollTo(0, 0)
  }, [orderItems]);

  const handleChange = (e) => {
    const level = e;
    setStatus(e);

  }



  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>

          <Grid container item direction="column" spacing={4}  >
            {(Array.isArray(orderItems) && orderItems.length > 0) ? orderItems.map((item, pos) => {
              return (
                <Grid item xs container direction="row" wrap="nowrap" spacing={2} key={pos} alignItems="center">
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="thumbnail" src={item.productThumbnail} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs align="left" >
                    <Typography gutterBottom variant="h5" >
                      {item.productName}
                    </Typography>
                    {currentUser[0] === "admin" ?
                      < Select value={status} onChange={(e) => handleChange(e.target.value)} >
                        <MenuItem key={0} value="Processing" >Processing</MenuItem>
                        <MenuItem key={1} value="Dispatched" >Dispatched</MenuItem>
                        <MenuItem key={2} value="Shipping" >Shipping</MenuItem>
                        <MenuItem key={3} value="Delivered" >Delivered</MenuItem>
                      </Select>
                      :

                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        Status :  {order.orderStatus}
                      </Typography>
                    }
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Size :  {item.size}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      QUANTITY : {item.quantity}
                    </Typography>
                    {item.discountedPrice ?
                      <Typography variant="h5" gutterBottom >
                        &#x20b9;{item.discountedPrice}/-
                        <Typography variant="body1" color="textSecondary">
                          SAVED : {item.productPrice - item.discountedPrice}
                        </Typography>
                      </Typography> : <Typography variant="h5" gutterBottom >
                        &#x20b9;{item.productPrice}/-
                      </Typography>}
                  </Grid>
                </Grid>
              )
            }) :
              (loading ?
                <CircularProgress style={{ margin: '10.5vw', alignSelf: 'center' }} color="inherit" /> :
                <Typography variant="h3" color="textSecondary" style={{ textAlign: 'left', padding: '10vw', alignSelf: 'center' }}>
                  Oh! No... <br />No Items Found.
                </Typography>)}
          </Grid>
        </Grid>
      </Paper>
    </div >
  )
}

export default OrderDetails;
