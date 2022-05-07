import React from 'react';
import ProductResults from './../../components/ProductResults';

const Search = ({ cat }) => {
  return (
    <div className="searchPage">
      {/* <Division /> */}
      <ProductResults cat={cat} />
    </div>
  );
};

export default Search;