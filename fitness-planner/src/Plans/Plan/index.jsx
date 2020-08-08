import React, { useState} from 'react';
import {Card} from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'
import './index.css'
import userService from '../../services/user-service';
import { useEffect } from 'react';

const Plan = ({isLogged, plan}) => {
    const [authorName, setAuthorName] = useState('');
    
    useEffect(() => {
        if(plan.author) {
            userService.getUsers().then(users => {
                
                const filteredUser = users.filter(u => u._id === plan.author)[0]
                setAuthorName(filteredUser.username)
            })
        }
    }, [plan.author])

   
    
    return (
        <div className="plan">
            <Card>
                <div className="media">
                    <img src={plan.imageUrl} alt=""/>
                </div>
                {/* <Card.Img variant="top" src={plan.imageUrl} /> */}
                <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Text>
                        {plan.level} | {plan.goal}
                        <br/>
                        {plan.author ?<i>created by: {authorName}</i> : null }
                    </Card.Text>
                    {isLogged ? <Link className='link details-link' to={`/details/${plan._id}`}>Details</Link> 
                    : <Link className='link details-link' to='/login'>Log in to see details</Link>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Plan;