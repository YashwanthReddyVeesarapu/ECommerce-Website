import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ShopMen from './../../assets/shopMens.webp';
import ShopWomen from './../../assets/shopWomens.webp';
import './styles.scss';

const Directory = props => {
  return (

    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopWomen})`
          }}
        >
          <Link to="/rediva/womens">
            Shop Womens
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopMen})`
          }}
        >
          <Link to="/rediva/mens">
            Shop Mens
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Directory;