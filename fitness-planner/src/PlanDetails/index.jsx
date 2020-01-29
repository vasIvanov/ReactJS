import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import './index.css';
import planService from '../services/plan-service'
import userServices from '../services/user-service'

const PlanDetails = ({match, isLogged, userData, history}) => {
    const [plan, setPlan] = useState('');
    const userId = userData._id;
    const planId = match.params.id;
    const [added, setAdded] = useState(false);

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
        userServices.update({_id: userData._id, planId, add: true}).then(() => {
            history.push('/')
        })
    }

    const handleRemoveClick = () => {
        userServices.update({_id: userData._id, planId, add: false}).then(() => {
            history.push('/')
        })
    }

    return plan ? (
        <React.Fragment>
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
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Day 1</th>
                        <th>Day 2</th>
                        <th>Day 4</th>
                        <th>Day 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>{plan.exercices.day1[0]}</td>
                        <td>{plan.exercices.day2[0]}</td>
                        <td>{plan.exercices.day3[0]}</td>
                        <td>{plan.exercices.day4[0]}</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>{plan.exercices.day1[1]}</td>
                        <td>{plan.exercices.day2[1]}</td>
                        <td>{plan.exercices.day3[1]}</td>
                        <td>{plan.exercices.day4[1]}</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>{plan.exercices.day1[2]}</td>
                        <td>{plan.exercices.day2[2]}</td>
                        <td>{plan.exercices.day3[2]}</td>
                        <td>{plan.exercices.day4[2]}</td>
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>{plan.exercices.day1[3]}</td>
                        <td>{plan.exercices.day2[3]}</td>
                        <td>{plan.exercices.day3[3]}</td>
                        <td>{plan.exercices.day4[3]}</td>
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>{plan.exercices.day1[4]}</td>
                        <td>{plan.exercices.day2[4]}</td>
                        <td>{plan.exercices.day3[4]}</td>
                        <td>{plan.exercices.day4[4]}</td>
                        </tr>
                        <tr>
                        <td>6</td>
                        <td>{plan.exercices.day1[5]}</td>
                        <td>{plan.exercices.day2[5]}</td>
                        <td>{plan.exercices.day3[5]}</td>
                        <td>{plan.exercices.day4[5]}</td>
                        </tr>
                    </tbody>

                </Table>
                {added ? (<button onClick={handleRemoveClick} type='button'>Remove from Favorites </button>) : <button onClick={handleAddClick} type='button'>Add to Favorites </button>}
                </div>
            </div>
        </React.Fragment>
    ) : <div>Loading ...</div>
}

export default PlanDetails;