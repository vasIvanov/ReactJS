import React from 'react';
import Header from '../Header'

const NotFound = ({history}) => {
  return (
    <div>
        <Header history={history} isLogged={false}  bgColor='dark'/>
        Not Found
    </div>
  )
} 

export default NotFound;