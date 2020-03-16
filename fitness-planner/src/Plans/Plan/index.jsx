import React from 'react';
import {Card} from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'
import './index.css'

const Plan = ({isLogged, plan}) => {
    // let details = plan.details.split(' ').length > 20 ? plan.details.split(' ').slice(0, 20).join(' ').trim().concat(' .....') : plan.details;
    let detailUrl = `/details/${plan._id}`;
    
    return (
        <div className="plan">
            <Card>
                <Card.Img variant="top" src={plan.imageUrl} />
                <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Text>
                        {plan.level} | {plan.goal}
                    </Card.Text>
                    {isLogged && <Link className='link details-link' to={detailUrl}>Details</Link>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Plan;