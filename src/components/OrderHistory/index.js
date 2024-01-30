import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, ButtonBase, Paper, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: "10%",
//     paddingTop: 10,
//     paddingBottom: 10,
//     "@media (max-width: 980px)": {
//       padding: 10,
//     },
//   },
//   paper: {
//     padding: theme.spacing(1),
//     marginBottom: "1vh",
//   },
//   image: {
//     width: 300,
//     height: 200,
//     "@media (max-width: 980px)": {
//       width: 180,
//       height: 200,
//       objectFit: "cover",
//     },
//   },
//   img: {
//     margin: "auto",
//     display: "block",
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
// }));

const OrderHistory = ({ orders, currentUser }) => {
  //const dispatch = useDispatch();
  const history = useHistory();
  //const { cartItems, total } = useSelector(mapState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(orders) && orders.length === 0) setLoading(false);
    window.scrollTo(0, 0);
  }, [orders]);

  return (
    <div className={"root"}>
      <Paper className={"paper"}>
        <Grid container spacing={2}>
          <Grid container item direction="column" spacing={4}>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((item, pos) => {
                const { documentID } = item;
                return (
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    wrap="nowrap"
                    spacing={2}
                    key={pos}
                    alignItems="center"
                  >
                    <Grid item>
                      <ButtonBase className={"image"}>
                        <img
                          onClick={() =>
                            history.push(
                              currentUser === "admin"
                                ? `/order/${documentID}/?auth=admin&ID=${documentID}`
                                : `/order/${documentID}`
                            )
                          }
                          className={"img"}
                          alt="thumbnail"
                          src={item.orderItems[0].productThumbnail}
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs align="left">
                      <Typography gutterBottom variant="h5">
                        {item.orderItems
                          .map((item) => item.productName)
                          .toString()}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        gutterBottom
                      >
                        Status : {item.orderStatus}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        PAYMENT : {item.paymentMethod.type}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        color="textSecondary"
                      >
                        ITEMS : {item.orderItems.length}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        &#x20b9;{item.orderTotal}/-
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })
            ) : loading ? (
              <CircularProgress
                style={{ margin: "10.5vw", alignSelf: "center" }}
                color="inherit"
              />
            ) : (
              <Typography
                variant="h3"
                color="textSecondary"
                style={{
                  textAlign: "left",
                  padding: "10vw",
                  alignSelf: "center",
                }}
              >
                Oh! No... <br />
                Not Yet Ordered?
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default OrderHistory;

{
  /* <Grid container spacing={8} >
                <Grid item xs container direction="column" spacing={2}>
                {cartItems.map((item,pos)=>(
                    <Grid item key={pos}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            {item.productName}
                            </Typography>
                            price: {item.productPrice}

                            size : {item.size}
                            <h5>
                            Quantity:{item.quantity}
                            </h5>
                        </Grid>
                        </Grid>
                        ))}
                    </Grid> 
            </Grid> */
}
