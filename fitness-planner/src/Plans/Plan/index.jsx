import React, { useState, Fragment, useEffect } from 'react';
import {Tabs, Tab, Card, Button} from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'
const Plan = ({isLogged, plan}) => {
    let detailUrl = `/details/${plan._id}`
    return (
        <div className="plan">
            <Card>
                <Card.Img variant="top" src={plan.imageUrl} />
                <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Text>
                        {plan.details}
                    </Card.Text>
                    {isLogged && <Link className='link' to={detailUrl}>Details</Link>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Plan;