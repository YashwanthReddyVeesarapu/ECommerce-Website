import React, { useState } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import "./styles.scss";

import {
  AccountCircleOutlined,
  ShoppingCart,
  AccountCircle,
  Search,
} from "@mui/icons-material";

import redLogo from "./../../assets/Red-logo.webp";
import { Badge, IconButton } from "@mui/material";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const param = new URLSearchParams(location.search);
  const search = param.get("search");

  const [key, setKey] = useState(search ? search : "");

  const handleSearchKey = (e) => {
    let searchKey = e.toLowerCase().trim();
    if (searchKey.length > 0) history.push(`/search/?search=${searchKey}`);
    else history.push("/search");
  };

  function set() {
    sessionStorage.setItem("scrool", 0);
    handleSearchKey(key);
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={redLogo} alt="Rediva Logo" />
          </Link>
        </div>

        <nav>
          <div className="SearchBar">
            <input
              type="text"
              value={key}
              placeholder="Search..."
              onChange={(e) => {
                setKey(e.target.value);
              }}
              onKeyDown={(e) => e.which === 13 && set()}
            />
            <IconButton onClick={() => set()}>
              <Search fontSize="large" />
            </IconButton>
          </div>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show Cart Items"
                color="inherit"
              >
                <Badge badgeContent={totalNumCartItems}>
                  <ShoppingCart fontSize="large" style={{ paddingLeft: 0 }} />
                </Badge>
              </IconButton>
            </li>

            {currentUser && [
              <li key={1}>
                <IconButton
                  component={Link}
                  to="/dashboard"
                  aria-label="Dashboard"
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </li>,
            ]}

            {!currentUser && [
              <li key={1}>
                <IconButton component={Link} to="/login/?path=/dashboard">
                  <AccountCircleOutlined fontSize="large" />
                </IconButton>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
