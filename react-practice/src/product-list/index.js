import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../product-card';
import Header from '../header';
import styles from './styles.module.css';
import logged from '../logged';
import styled, { css } from 'styled-components';
import data from '../data'

const Wrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding-top: 40px;

  ${props => props.red && css`
    background-color: red;
  `}
`

const renderCards = (products) => {
  return products.map(product => {
    return (
      <Fragment key={product.id}>
        {logged(ProductCard, product)}
      </Fragment>
      );
  });
}

class ProductList extends React.Component  {
  state = {
    isRed: false,
    ownerName: 'Placeholder'
  }

  handleClick = () => {
    this.setState({
      isRed: !this.state.isRed
    })
  }

  componentDidMount() {
    fetch('http://api.github.com/users/vasIvanov')
      .then((response) => response.json())
      .then((myJson) => {
        this.setState({
          ownerName: myJson.name
        })
      })
      .catch((myErr) => console.log(myErr));
  }

  render() {
    return (
      <Fragment>
        <Header />
        {this.state.ownerName}
        <button onClick={this.handleClick}>Toggle Red</button>
        <Wrapper red={this.state.isRed}>
          {renderCards(data)}
        </Wrapper>
      </Fragment>
    );
  }

}

export default ProductList;
