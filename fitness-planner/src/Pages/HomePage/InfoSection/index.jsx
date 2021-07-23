import React from 'react';
import './index.css';
import { CardDeck, Card } from 'react-bootstrap';

const InfoSection = () => {
    return (
        <React.Fragment>
            <CardDeck className='custom-card-deck'>
                <Card className='custom-card'>
                    <Card.Img variant="top" src="https://previews.123rf.com/images/luckybusiness/luckybusiness1702/luckybusiness170200123/72211497-man-and-woman-strengthen-hands-at-fitness-training.jpg" />
                    <Card.Body>
                        <Card.Title>Easy to start</Card.Title>
                        <Card.Text>
                            Just register and find your favorite plan
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='custom-card'>
                <Card.Img variant="top" src="data:image/jpeg;base64,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" />
                <Card.Body>
                    <Card.Title>Direct feedback</Card.Title>
                    <Card.Text>
                        Share your expirience with others
                    </Card.Text>
                </Card.Body>
                </Card>
                <Card className='custom-card'>
                <Card.Img variant="top" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX12726963.jpg" />
                <Card.Body>
                    <Card.Title>Detailed fitness plans</Card.Title>
                    <Card.Text>
                        Our instructor explain in details how the plan works and how it must be executed
                    </Card.Text>
                </Card.Body>
                </Card>
                <Card className='custom-card'>
                <Card.Img variant="top" src="https://media.timeout.com/images/105636250/630/472/image.jpg" />
                <Card.Body>
                    <Card.Title>Dance Activities</Card.Title>
                    <Card.Text>
                        Browse dance events with detailed information
                    </Card.Text>
                </Card.Body>
                </Card>
            </CardDeck>
        </React.Fragment>
    
    )
}

export default InfoSection;