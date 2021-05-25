import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userService from '../services/user-service';
import { useEffect } from 'react';

const Dance = ({history,
  dance,
  isLogged}) => {
    const [authorName, setAuthorName] = useState('');
    useEffect(() => {
      let isMounted = true;
      if (dance.author) {
        userService.getUsers().then((users) => {
          if (isMounted) {
            const filteredUser = users.filter((u) => u._id === dance.author)[0];
            setAuthorName(filteredUser.username);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, [dance.author]);

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
            {dance.author ? <i>created by: {authorName}</i> : null}
          </Card.Text>
          {isLogged ? (
            <Link className="link details-link" to={`/dance-details/${dance._id}`}>
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
    )
}

export default Dance;