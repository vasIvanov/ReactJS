import React, { useState, Fragment, useEffect } from 'react';
import {Tabs, Tab, Card, Button} from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'
const Plan = ({isLogged}) => {
    return (
        <div className="plan">
            <Card>
                <Card.Img variant="top" src="https://www.thehealthcloud.co.uk/wp-content/uploads/weights-e1443430990483-1920x1024.jpg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's contentSome quick example text to build on the card title and make up the bulk of
                    the card's content...
                    </Card.Text>
                    {isLogged && <Link className='link' to="/details">Details</Link>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Plan;