import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

const Plan = ({ isLogged, plan }) => {
  console.log('plan');
  return (
    <div className="plan">
      <Card>
        <div className="media">
          <img src={plan.imageUrl} alt="" />
        </div>
        {/* <Card.Img variant="top" src={plan.imageUrl} /> */}
        <Card.Body>
          <Card.Title>{plan.name}</Card.Title>
          <Card.Text>
            {plan.level} | {plan.goal}
            <br />
            {plan.author ? <i>created by: {plan.author.username}</i> : null}
          </Card.Text>
          {isLogged ? (
            <Link className="link details-link" to={`/details/${plan._id}`}>
              Details
            </Link>
          ) : (
            <Link className="link details-link" to="/login">
              Log in to see details
            </Link>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Plan;
