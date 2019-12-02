import React, { Component } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  state = {
    searchValue: ""
  }

  handleChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  render() {
    const { searchValue } = this.state
    return (
      <div className="header-container">
        <Link className="name" to="/">SoftUni React.js course</Link>
        <Link className="checkout" to="/checkout">Checkout</Link>
        <input value={searchValue} onChange={this.handleChange} placeholder="Search..." />
      </div>
    )
  }

}

export default Header