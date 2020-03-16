import React from 'react';
import './index.css';
import { CardDeck, Card } from 'react-bootstrap';

const InfoSection = () => {

    return (
        <React.Fragment>
            <h3 className='info-title'>Working Title</h3>
            <CardDeck className='custom-card-deck'>
                <Card className='custom-card'>
                    <Card.Img variant="top" src="https://previews.123rf.com/images/luckybusiness/luckybusiness1702/luckybusiness170200123/72211497-man-and-woman-strengthen-hands-at-fitness-training.jpg" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='custom-card'>
                <Card.Img variant="top" src="data:image/jpeg;base64,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" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                    This card has supporting text below as a natural lead-in to additional
                    </Card.Text>
                </Card.Body>
                </Card>
                <Card className='custom-card'>
                <Card.Img variant="top" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX12726963.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    </Card.Text>
                </Card.Body>
                </Card>
            </CardDeck>
        </React.Fragment>
    
    )
}

export default InfoSection;