import React from 'react';
import './index.css';
import {Tabs, Tab} from 'react-bootstrap';
import Plan from './Plan';

const Plans = ({isLogged, plans, categoriezed}) => {
    let weightLossPlans = '';
    let muscleGainPlans = '';
    if(plans && categoriezed) {
        weightLossPlans = plans.filter(p => {
            return p.goal.toLowerCase() === 'weight loss'
        });
    
        muscleGainPlans = plans.filter(p => {
            return p.goal.toLowerCase() === 'muscle gain'
        })
    }
    
    return categoriezed && plans ? (
        <div className="plans-tabs">
            <Tabs className='custom' defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="muscle-gain" title="Muscle Gain">
                    <div className="plans">
                        {muscleGainPlans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
                    </div>
                </Tab>
                <Tab eventKey="weight-loss" title="Weight Loss">
                    <div className="plans">
                        {weightLossPlans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
                    </div>
                </Tab>
                <Tab eventKey="all" title="All Plans">
                <div className="plans">
                    {plans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
                </div>
                </Tab>
            </Tabs>

        </div>
    ) 
    : 
    (plans ? 
    <div className="plans-tabs">
        <div className="plans">
            {plans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
        </div>
    </div> : '' )
}

export default Plans;