import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { fetchProductsStart } from "./../../redux/Products/products.actions";
import Product from "./Product";
import LoadMore from "./../LoadMore";
import "./styles.scss";
import {
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Grid,
  CircularProgress,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import PropTypes from "prop-types";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const options = [
  { Name: "Show All", id: "all" },
  { Name: "Womens", id: "womens" },
  { Name: "Mens", id: "mens" },
];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        &emsp;&emsp;Show me&emsp;&emsp;
      </DialogTitle>
      {options.map((option, i) => (
        <List key={i}>
          <ListItem button onClick={() => handleListItemClick(option.id)}>
            <ListItemText primary={option.Name} />
          </ListItem>
        </List>
      ))}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const ProductResults = ({ cat }) => {
  const dispatch = useDispatch();
  const loaction = useLocation();
  const history = useHistory();
  const params = useParams();
  const { filterStore, filterType } = useParams();
  const { products } = useSelector(mapState);
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);

  const param = new URLSearchParams(useLocation().search);
  const searh = param.get("search");

  const { data, queryDoc, isLastPage } = products;

  const scrool = sessionStorage.getItem("scrool");

  const observer = useRef(null); // Ref for the IntersectionObserver
  const lastItemRef = useRef(null); // Ref for the last element in the list

  useEffect(() => {
    if (Array.isArray(data))
      sessionStorage.setItem("noOfProducts", data.length);
    if (scrool > 200) {
      window.scrollTo(0, 0);
      window.scrollTo(0, scrool);
    }
  }, [data]);

  useEffect(() => {
    sessionStorage.removeItem("scrool");
    window.scrollTo(0, scrool);
    dispatch(fetchProductsStart({ cat, filterStore, filterType, searh }));
  }, [filterType, searh]);

  const handleFilter = (e) => {
    const nextFilter = e;
    history.push(`/${cat}/${filterStore}/${nextFilter}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === undefined && filterType === undefined) handleFilter("");
    else if (value === undefined && filterType !== undefined)
      handleFilter(filterType);
    else handleFilter(value);
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterStore,
        filterType,
        searh,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  // Callback function to be debounced
  const handleIntersection = () => {
    if (isLastPage) return; // Skip if already loading
    if (observer.current) observer.current.disconnect(); // Disconnect the previous observer

    // Load more data when the last item is in view
    if (lastItemRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleLoadMore();
          }
        },
        { threshold: 0.1 } // Adjust the threshold as needed
      );

      observer.current.observe(lastItemRef.current);
    }
  };

  // Debounce the intersection callback
  const debouncedHandleIntersection = debounce(handleIntersection, 0);

  // Attach the debounced callback to the scroll event
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleIntersection);
    return () => {
      window.removeEventListener("scroll", debouncedHandleIntersection);
    };
  }, [debouncedHandleIntersection]);

  return (
    <div className="products">
      <h1>
        Browse Products
        {filterStore !== undefined && (
          <IconButton onClick={handleClickOpen}>
            <FilterList />
          </IconButton>
        )}
      </h1>
      {/* <FeaturedImagesLayout /> */}

      {Array.isArray(data) && data.length === 0 ? (
        <div className="products">
          <p
            style={{
              textAlign: "center",
              paddingTop: "30vh",
              paddingBottom: "20vh",
            }}
          >
            No search results.
          </p>
        </div>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="productResults">
          {data
            .filter((product) => product)
            .map((product, pos) => {
              const { productThumbnail, productName, productPrice } = product;
              if (
                !productThumbnail ||
                !productName ||
                typeof productPrice === "undefined"
              )
                return null;

              const configProduct = {
                ...product,
              };

              return <Product key={pos} {...configProduct} />;
            })}
          {/* {!isLastPage ? (
            <div className="loadMore">
              <LoadMore {...configLoadMore} />
            </div>
          ) : (
            <h6> That's ALL</h6>
          )} */}
          <div ref={lastItemRef} className="loadMore"></div>
          {isLastPage && <h6> That's ALL</h6>}
        </div>
      ) : (
        <div className="loading">
          {" "}
          <CircularProgress
            color="inherit"
            style={{
              marginTop: "calc(50vh - 20px)",
              marginLeft: "calc(50vw - 20px)",
            }}
          />
        </div>
      )}

      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default ProductResults;
