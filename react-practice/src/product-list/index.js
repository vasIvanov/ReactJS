import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../product-card';
import Header from '../header';
import './styles.css';

const renderCards = (products) => {
  return products.map(product => {
    return (<ProductCard key={product.id} {...product} />);
  });
}

const ProductList = ({ products }) => {

  return (
    <Fragment>
      <Header />
      <div className="container">
        {renderCards(products)}
      </div>
    </Fragment>
  );
}

ProductList.defaultProps = {
  products: []
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList;
