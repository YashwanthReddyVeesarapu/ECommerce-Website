import React from 'react';
import { Link } from 'react-router-dom';
import Rediva from './../../assets/Rediva.webp';
import brandStore from './../../assets/brandStore.webp';
import './styles.scss';
import { Helmet } from 'react-helmet';

const CustomDirectory = props => {
  return (
    <div className="directory">
      <Helmet>
        <title>Rediva</title>
      </Helmet>

      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${brandStore})`
          }}
        >
          <Link to="/search/brandstore">
            Brand Store
          </Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${Rediva})`,
            backgroundPosition: '0 30%'
          }}
        >
          <Link to="/search/rediva/womens">
            Rediva
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomDirectory;