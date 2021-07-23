import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dance = ({history,
  dance,
  isLogged}) => {
    return (
    <div className="plan">
      <Card>
        <div className="media">
          <img src={dance.imageUrl} alt="" />
        </div>
        {/* <Card.Img variant="top" src={plan.imageUrl} /> */}
        <Card.Body>
          <Card.Title>{dance.name}</Card.Title>
          <Card.Text>
            {dance.type}
            <br />
            {dance.author ? <i>created by: {dance.author.username}</i> : null}
          </Card.Text>
          {isLogged ? (
            <Link className=" details-link" to={`/dance-details/${dance._id}`}>
              Details
            </Link>
          ) : (
            <Link className=" details-link" to="/login">
              Log in to see details
            </Link>
          )}
        </Card.Body>
      </Card>
    </div>
    )
}

export default Dance;