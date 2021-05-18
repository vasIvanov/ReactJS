import React, { useState, Fragment, useEffect } from 'react';
import planServices from '../services/plan-service';
import CreatePlan from '../Create-plan';

const EditPlan = ({ match, history, showChange }) => {
  const planId = match.params.id;
  const [plan, setPlan] = useState('');

  useEffect(() => {
    planServices.load(planId).then((plan) => {
      setPlan(plan);
    });
  }, [planId]);

  return (
    <Fragment>
      <CreatePlan history={history} showChange={showChange} editPlan={plan} />
    </Fragment>
  );
};

export default EditPlan;
