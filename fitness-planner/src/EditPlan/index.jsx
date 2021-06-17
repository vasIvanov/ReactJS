import React, { Fragment } from 'react';
import CreatePlan from '../Create-plan';
import { useSelector } from 'react-redux';

const EditPlan = ({ isLogged, match, history, showChange }) => {
  const planId = match.params.id;
  // const [plan, setPlan] = useState('');
  const plan = useSelector(state => state.plan.plans.find(plan => plan._id === planId))
  // useEffect(() => {
  //   planServices.load(planId).then((plan) => {
  //     setPlan(plan);
  //   });
  // }, [planId]);
  return (
    <Fragment>
      <CreatePlan history={history} showChange={showChange} editPlan={plan} />
    </Fragment>
  );
};

export default EditPlan;
