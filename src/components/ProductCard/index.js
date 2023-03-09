import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import {
  addProduct,
  handleSize,
  handleColour,
} from "./../../redux/Cart/cart.actions";
import Button from "./../forms/Button";
import ImageSlider from "./../Slider/imageSlider";
import "./styles.scss";
import { Helmet } from "react-helmet";
import {
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  InputLabel,
} from "@material-ui/core";
import SimpleDialog from "../Dialog";
import { HelpOutline } from "@material-ui/icons";

import { sizeCharts } from "../../pages/Admin/Additionals";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
    discount,
    discountedPrice,
    productSize,
    brand,
    productColor,
    adaptiveThumbnails,
    productType,
  } = product;

  const [colour, setColour] = useState("");

  useEffect(() => {
    Array.isArray(productColor) &&
      productColor.map((x, i) => {
        if (i === 0) setColour(x);
      });
  }, [productColor]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;

    if (size === "" || colour === "") handleClickOpen();
    else {
      dispatch(addProduct(product, size, colour));

      history.push("/cart");
    }
  };

  const configAddToCartBtn = {
    type: "button",
  };

  var sizeChartURL = "";
  Object.values(sizeCharts.womenApparel).filter((f) => {
    if (f.label === productType) sizeChartURL = f.Url;
  });

  const url = window.location.href;

  if (
    productThumbnail !== undefined ||
    adaptiveThumbnails !== undefined ||
    productColor !== undefined
  ) {
    return (
      <div className="productCard">
        <Helmet>
          <title>Rediva | {productName}</title>
          <meta name="keyword" content={productName} />

          <meta property="og:title" content={productName} />
          <meta property="og:description" content="T-Shirt" />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={productThumbnail} />
          <meta property="product:brand" content={brand} />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta
            property="product:price:amount"
            content={discountedPrice === 0 ? productPrice : discountedPrice}
          />
          <meta property="product:price:currency" content="INR" />
          <meta property="product:retailer_item_id" content="Rediva#" />
          <meta property="product:item_group_id" content={brand} />
        </Helmet>
        <SimpleDialog
          open={sizeChartOpen}
          onClose={() => setSizeChartOpen(false)}
          title={"SIZE CHART | REDIVA "}
          closeText={"Close"}
          text={`<img width='100%' src=${sizeChartURL} />`}
        />

        <div className="hero">
          <ImageSlider data={adaptiveThumbnails.map} color={colour} />
        </div>

        <div className="productDetails">
          <div className="mainDetails">
            <ul>
              <li>
                <h1
                  style={{ fontSize: "2.5rem", marginBottom: "5px" }}
                  aria-label="title"
                >
                  {productName}
                </h1>
              </li>
              <li>
                {discountedPrice === 0 ? (
                  <h2 className="price">&#x20b9;{productPrice}</h2>
                ) : (
                  <div className="same-line">
                    <h2 className="price">&#x20b9;{discountedPrice}&nbsp;</h2>
                    <s>&#x20b9;{productPrice} </s>
                  </div>
                )}
              </li>
            </ul>
            <div className="brand">
              <small>{brand}</small>
            </div>
            <div className="productColours">
              {adaptiveThumbnails.colors.map((a, i) => {
                if (a === "white")
                  return (
                    <div
                      className={
                        colour === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "white" }}
                      onClick={() => setColour("white")}
                    />
                  );
                if (a === "black")
                  return (
                    <div
                      className={
                        colour === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "black" }}
                      onClick={() => setColour("black")}
                    />
                  );

                if (a === "coffee brown")
                  return (
                    <div
                      className={
                        colour === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#914A37" }}
                      onClick={() => setColour("coffee brown")}
                    />
                  );
                if (a === "lavender")
                  return (
                    <div
                      className={
                        colour === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#E6E6FA" }}
                      onClick={() => setColour("lavender")}
                    />
                  );
                if (a === "light baby pink")
                  return (
                    <div
                      className={
                        colour === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#f4C2C2" }}
                      onClick={() => setColour("light baby pink")}
                    />
                  );
              })}
            </div>

            <div className="sizeSelect">
              <HelpOutline
                onClick={() => setSizeChartOpen(true)}
                style={{
                  left: "-30%",
                  top: "30%",
                  position: "absolute",
                  color: "gray",
                }}
                fontSize="large"
              />
              <FormControl style={{ minWidth: 80 }} variant="outlined">
                <InputLabel style={{ fontSize: 13, padding: 10 }}>
                  {" "}
                  Size{" "}
                </InputLabel>
                <Select
                  style={{ fontSize: 10 }}
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {productSize
                    .map((name, value) => ({ name: name, value: value }))
                    .map((item) => (
                      <MenuItem
                        style={{ fontSize: 10 }}
                        key={item.value}
                        value={item.name}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <SimpleDialog
                open={open}
                onClose={handleClose}
                text={`Please, <br />Select ${
                  size === "" && (colour === "" || colour === "z")
                    ? "Size & Colour"
                    : size === ""
                    ? "Size"
                    : "Colour"
                }<br />To Procced with cart...`}
              />
            </div>

            <div className={size === "" ? "addToCart" : "addToCartActive"}>
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </div>
          {/* <ul>
            <li>
              <span
                className="desc"
                dangerouslySetInnerHTML={{ __html: productDesc }} />
            </li>
          </ul> */}
          <div className="description">
            <h3>Specs</h3>
            <table border="1" cellPadding="1" style={{ width: "50%" }}>
              <tr>
                <th>Model</th>
                <td>{productName}</td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>{brand}</td>
              </tr>
              <tr>
                <th>Material</th>
                <td>Cotton</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <CircularProgress
        style={{
          alignSelf: "center",
          color: "inherit",
          marginLeft: "48%",
          marginTop: "35vh",
          marginBottom: "35vh",
        }}
      />
    );
};

export default ProductCard;
