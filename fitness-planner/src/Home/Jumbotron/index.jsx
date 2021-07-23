import React from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './index.css'

const JumbotronFunc = () => {
  return (
    <div className='jumbotron-comp' >
      <Container>
        <div className='info'>
          <h1>Begin your active lifestyle today!</h1>
          <p>
              Register and find the fitness plan or dance activity that suits you the most. It's time to become the person you always wanted
          </p> 
          <Link className='jumbo-link' to="/register">Register</Link>
        </div>
      </Container>
    </div>
  )
}

export default JumbotronFunc;