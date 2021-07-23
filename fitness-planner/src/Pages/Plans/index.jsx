import React, {  useEffect, memo } from 'react';
import './index.css';
import { Tabs, Tab } from 'react-bootstrap';
import Plan from '../../Components/Plan';
import Dance from '../../Components/Dance/Dance';
import { useDispatch, useSelector } from 'react-redux';
import { getDances } from '../../features/danceSlice';
import { getPlans } from '../../features/planSlice';

const Plans = ({ isLogged, history }) => {
  const plans = useSelector(state => state.plan.plans)
  const dances = useSelector(state => state.dance.dances)
  const dispatch = useDispatch();

  useEffect(() => {
    if(plans === null) {
      dispatch(getPlans())
    }
    if(dances === null) {
      dispatch(getDances())
    }
  }, [dispatch, dances, plans]);

  return (plans && dances) ? (
    <React.Fragment>
      <div className="plans-tabs">
        {plans ?         <Tabs
          className="custom"
          defaultActiveKey="all"
          id="controlled-tab-example"
        >
          <Tab eventKey="all" title="All Activities">
            <div className="plans">
              {plans.map((plan, i) => (
                <Plan
                  history={history}
                  key={i}
                  plan={plan}
                  isLogged={isLogged}
                />
              ))}
              {dances.map((dance, i) => (
                <Dance
                  history={history}
                  key={i}
                  dance={dance}
                  isLogged={isLogged}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="muscle-gain" title="Muscle Gain">
            <div className="plans">
              {plans.map((plan, i) => {
                if (plan.goal.toLowerCase() === 'muscle gain') {
                  return (
                    <Plan
                      history={history}
                      key={i}
                      plan={plan}
                      isLogged={isLogged}
                    />
                  );
                }
                return null;
              })}
            </div>
          </Tab>
          <Tab eventKey="weight-loss" title="Weight Loss">
            <div className="plans">
              {plans.map((plan, i) => {
                if (plan.goal.toLowerCase() === 'weight loss') {
                  return (
                    <Plan
                      history={history}
                      key={i}
                      plan={plan}
                      isLogged={isLogged}
                    />
                  );
                }
                return null;
              })}
            </div>
          </Tab>
          <Tab eventKey="dance-events" title="Dance Events">
            <div className="plans">
              {dances.map((dance, i) => {
                  return (
                    <Dance
                      history={history}
                      key={i}
                      dance={dance}
                      isLogged={isLogged}
                    />
                  );
              })}
            </div>
          </Tab>
        </Tabs> : null}

      </div>

      {plans.length < 1 && (
        <div className="no-plans-fallback">
          <p>No plans are created yet!</p>
        </div>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      Loading ...
    </React.Fragment>
  );
};

export default memo(Plans);
