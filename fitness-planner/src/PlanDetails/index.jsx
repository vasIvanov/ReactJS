import React, {useState, useEffect, useContext} from 'react';
import './index.css';
import planService from '../services/plan-service'
import userServices from '../services/user-service'
import {userContext} from '../userContext';
import {Button, Modal} from 'react-bootstrap';
import Header from '../Header';
import {
    Link
  } from 'react-router-dom'

const PlanDetails = ({match, isLogged, history, setUserData}) => {
    const [plan, setPlan] = useState('');
    const userValue = useContext(userContext)
    const userId = (userValue && userValue._id) || localStorage.getItem('_id');
    const planId = match.params.id;
    const [added, setAdded] = useState(false);
    const plans = (userValue && userValue.plans) || JSON.parse(localStorage.getItem('plans'));
    let isAuthor = false;
    if(plan) {
        isAuthor = userId === plan.author;
    }
    
    
    useEffect(() => {
        planService.load(planId).then(plan => {
            setPlan(plan)
            userServices.getUsers().then(r => {
                const user = r.filter(u => u._id === userId)[0];
                user.plans.forEach(p => {
                    if(p._id === planId) {
                        setAdded(true);
                        return;
                    }
                })
            })
        })
    }, [planId, userId])
    
    const handleAddClick = () => {
        userServices.update({_id: userId, planId, add: true}).then(() => {
            if(userValue) {
                plans.push(plan)
                setUserData({
                    ...userValue,
                    plans
                })
            }
            if(localStorage.getItem('plans')) {
                plans.push(plan);
                localStorage.setItem('plans', JSON.stringify(plans));
            }
            history.push('/')
        })
    }

    const handleRemoveClick = () => {
        userServices.update({_id: userId, planId, add: false}).then(() => {
            if(userValue) {
                const filteredPlans = plans.filter(p => p._id !== planId);
                setUserData({
                    ...userValue,
                    plans: filteredPlans
                })
            }
            if(localStorage.getItem('plans')) {
                let newPlans = plans.filter(p => p._id !== planId);
                localStorage.setItem('plans', JSON.stringify(newPlans));
            }
            history.push('/')
        })
    }

    const renderData = () => {
        let header = Object.keys(plan.exercises)
        return header.map((key, index) => {
           return (
            <div className='plan-details' key={index}>
                <h5>Day {key.toUpperCase().split('DAY')[1]}</h5>
                {plan.exercises[key].map((e, i) => {
                    return (
                        <p key={i}>{e}</p>
                    )
                })}
            </div>
           )
        })
     }


     const [show, setShow] = useState(false);
     const handleShow = () => setShow(true);
     const handleDelete = () => {
         setShow(false);
         planService.deletePlan(plan._id).then(() => {
             history.push('/my-plans')
             
         })
     }

    return plan ? (
        <React.Fragment>
            <Header isLogged={isLogged}  bgColor='dark'/>
            <div className="details">
                <div className="media">
                    <img src={plan.imageUrl} alt=""/>
                </div>
                <div>
                    <h2 className="plan-name">{plan.name}</h2>
                    <p className="plan-complexity">{plan.level}</p>
                    <p className="plan-details">{plan.details}</p>
                </div>
                <div>

                <div className='plan-wrapper'>
                    {renderData()}
                </div>

                {isAuthor ? <div className='author-panel'>
                            <Link className='edit-link' to={`/edit/${plan._id}`}>Edit</Link>

                            <Button variant='danger' onClick={handleShow} >Delete</Button>
                            <Modal show={show} onHide={() => setShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title className='custom-modal-title'>Are you sure you want to delete this plan?</Modal.Title>
                                </Modal.Header>
                                <Modal.Footer className='custom-modal-footer'>
                                <Button variant="primary" onClick={handleDelete}>
                                    Yes, Delete!
                                </Button>
                                <Button variant="secondary" onClick={() => setShow(false)}>
                                    No
                                </Button>
                                </Modal.Footer>
                            </Modal>
                </div>

                : added ? (
                    <Button variant='danger' className='details-button' onClick={handleRemoveClick} type='button'>Remove from Favorites </Button>) 
                : 
                    <Button variant='primary' className='details-button' onClick={handleAddClick} type='button'>Add to Favorites </Button>
                }
                
                
                </div>
            </div>
        </React.Fragment>
    ) : <div>
            Loading ...
        </div>
}

export default PlanDetails;