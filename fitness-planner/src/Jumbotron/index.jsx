import React from 'react';
import { Jumbotron, Button, Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const JumbotronFunc = () => {
    return (
        <React.Fragment>
        <Jumbotron style={{ backgroundImage: `url()`, backgroundSize: 'cover' }} fluid>
            <Container>
                <h1>Begin your training today!</h1>
                <p>
                  
                </p>  This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information
                <p >
                    <Button variant="primary">Learn more</Button>
                </p>
            </Container>
        </Jumbotron>
        </React.Fragment>
    )
}

export default JumbotronFunc;