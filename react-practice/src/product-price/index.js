import React from 'react'
import './styles.css'
import {AuthContext} from '../ContextWrapper'

class ProductPrice extends React.Component{
  static contextType = AuthContext

  render() {
    const {
      price
    } = this.props

    if(!price) {
      return null;
    }

    return (
      <div className="product-price">
        Price: 
        <span>
          {price}$
        </span>
  
        {this.context.auth ? (
          <p>You have discount!</p>
        ) : null}
        
      </div>
    )
  }
}

export default ProductPrice