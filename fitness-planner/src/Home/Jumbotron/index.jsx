import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {userContext} from '../../userContext';
import './index.css'

const JumbotronFunc = ({isLogged}) => {
    const userValue = useContext(userContext);
    
    return (
        <div className='jumbotron-comp' >
            <Container>
                {isLogged && <div className='info'>
                    <h1>Browse our Plans {userValue && userValue.username ? userValue.username : localStorage.getItem('username')}!</h1>
                    <p>
                        Register and find the fitness plan that suits you the most. It's time to become the person you always wanted
                    </p>
                    </div> 
                }
                {!isLogged && 
                    <div className='info'>
                        <h1>Begin your training today!</h1>
                        <p>
                            Register and find the fitness plan that suits you the most. It's time to become the person you always wanted
                        </p> 
                        <Link className='jumbo-link' to="/register">Register</Link>
                    </div>
                }
            </Container>
        </div>
    )
}

export default JumbotronFunc;