import React from 'react';
import { useEffect } from 'react';
import Plan from '../Plans/Plan';
import Dance from '../Dance/Dance';
import Header from '../Header';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDances } from '../features/danceSlice';
import { getPlans } from '../features/planSlice';

const SearchedResults = ({ match, isLogged, history }) => {
  const query = match.params.query;
  // const [plans, setPlans] = useState('');
  const plans = useSelector(state => state.plan.plans)
  const dispatch = useDispatch()
  // const [dances, setDances] = useState('');
  const dances = useSelector(state => state.dance.dances)

  const seacredDances = dances && dances.filter(dance => dance.name.toLowerCase().includes(query))
  const searchedPlans = plans && plans.filter(plan => plan.name.toLowerCase().includes(query))

  useEffect(() => {
    if(plans === null) {
      dispatch(getPlans())
    }

    if(dances === null) {
      dispatch(getDances())
    }

  }, [query, dispatch, dances, plans]);

  return (
    <React.Fragment>
      <Header history={history} isLogged={isLogged} bgColor="dark" />
      <div className="searched-plans">
        {searchedPlans ? searchedPlans.map((plan) => (
          <Plan key={plan._id} plan={plan} isLogged={isLogged} />
        )) : null}

        {seacredDances ? seacredDances.map((dance) => (
          <Dance key={dance._id} dance={dance} isLogged={isLogged} />
        )) : null}
      </div>
    </React.Fragment>
  ) 
};

export default SearchedResults;