import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userContext} from '../userContext';
import './index.css'

const JumbotronFunc = ({isLogged}) => {
    const userValue = useContext(userContext);
    
    return (
        <div className='jumbotron-comp' >
            <Container>
                {isLogged && <div className='info'>
                    <h1>Browse our Plans {userValue && userValue.username ? userValue.username : localStorage.getItem('username')}!</h1>
                    <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information
                    </p>
                    </div> 
                }
                {!isLogged && 
                    <div className='info'>
                        <h1>Begin your training today!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information
                        </p> 
                        <Link className='jumbo-link' to="/register">Register</Link>
                    </div>
                }
            </Container>
        </div>
    )
}

export default JumbotronFunc;