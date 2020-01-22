import React from 'react';
import Header from '../Header'
import {Table} from 'react-bootstrap';
import './index.css';

const PlanDetails = () => {
    return (
        <React.Fragment>
            <div className="details">
                <div className="media">
                    <img src="https://www.thehealthcloud.co.uk/wp-content/uploads/weights-e1443430990483-1920x1024.jpg" alt=""/>
                </div>
                <div>
                    <h2 className="plan-name">Plan name</h2>
                    <p className="plan-complexity">Plan complexity</p>
                    <p className="plan-details">Plan details</p>
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
                        <td>Exercise 1 day 1</td>
                        <td>Exercise 1 day 2</td>
                        <td>Exercise 1 day 3</td>
                        <td>Exercise 1 day 4</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                    </tbody>

                </Table>
                <button type='button'>Add to Favorites </button>
                <button type='button'>Remove from Favorites </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PlanDetails;