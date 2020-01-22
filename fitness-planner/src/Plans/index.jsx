import React, { useState, Fragment, useEffect } from 'react';
import './index.css';
import {Tabs, Tab, Card, Button} from 'react-bootstrap';
import Plan from './Plan';

const Plans = ({isLogged}) => {
    return (
        <div className="plans-tabs">
            <Tabs  defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab  eventKey="muscle-gain" title="Muscle Gain">
                    <div className="plans">
                        <Plan isLogged={isLogged}/>
                        <Plan isLogged={isLogged}/>
                    </div>
                </Tab>
                <Tab eventKey="weight-loss" title="Weight Loss">

                </Tab>
                <Tab eventKey="all" title="All Plans">
                </Tab>
            </Tabs>

        </div>
    )
}

export default Plans;