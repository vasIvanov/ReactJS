import React, {useContext} from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userContext} from '../userContext';

const JumbotronFunc = ({isLogged}) => {
    const userValue = useContext(userContext);
    return (
        <Jumbotron style={{ backgroundImage: `url()`, backgroundSize: 'cover' }} fluid>
            <Container>
                    {isLogged && <div>
                        <h1>Browse our Plans {userValue.username}!</h1>
                        <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information
                        </p>
                        </div> 
                    }
                    {!isLogged && 
                        <div>
                            <h1>Begin your training today!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information
                            </p> 
                            <Link className='link' to="/register">Register</Link>
                        </div>
                    }
            </Container>
        </Jumbotron>
    )
}

export default JumbotronFunc;