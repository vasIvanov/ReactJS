import React, {useState, useEffect} from 'react';
import './index.css';
import {Tabs, Tab} from 'react-bootstrap';
import Plan from './Plan';
import planService from '../services/plan-service';
import Header from '../Header';

const Plans = ({isLogged, categorized}) => {
    const [plans, setPlans] = useState('');
    useEffect(() => {
        planService.load().then(r => {
            setPlans(r);
            
        })
    }, [])
    
    return categorized && plans ? (
        <React.Fragment> 
            <Header isLogged={isLogged}  bgColor='dark'/>
            <div className="plans-tabs">
                <Tabs className='custom' defaultActiveKey="all" id="controlled-tab-example">
                    <Tab   eventKey="muscle-gain" title="Muscle Gain">
                        <div className="plans">
                            {plans.map((plan, i) => { 
                                if(plan.goal.toLowerCase() === 'muscle gain') {
                                    return (<Plan key={i} plan={plan} isLogged={isLogged}/>)
                                } 
                                return null;
                            })}
                        </div>
                    </Tab>
                    <Tab  eventKey="weight-loss" title="Weight Loss">
                        <div className="plans">
                            {plans.map((plan, i) => { 
                                if(plan.goal.toLowerCase() === 'weight loss') {
                                    return (<Plan key={i} plan={plan} isLogged={isLogged}/>)
                                } 
                                return null;
                            })}
                        </div>
                    </Tab>
                    <Tab eventKey='all'   title="All Plans">
                        <div className="plans">
                            {plans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
                        </div>
                    </Tab> 
                </Tabs>
            </div>
            
        </React.Fragment>
    ) 
    : 
    'Loading ...'
}

export default Plans;