import React, { memo, useState } from 'react';
import planService from '../services/plan-service';
import danceService from '../services/dance-service';
import { useEffect } from 'react';
import Plan from '../Plans/Plan';
import Dance from '../Dance/Dance';
import Header from '../Header';
import './index.css';

const SearchedResults = ({ match, isLogged, history }) => {
  const query = match.params.query;
  const [plans, setPlans] = useState('');
  const [dances, setDances] = useState('');

  useEffect(() => {
    planService.load(null, null, null, query).then((r) => {
      setPlans(r);
    });
    danceService.load(null, null, null, query).then((r) => {
      setDances(r);
    });
  }, [query]);

  return (
    <React.Fragment>
      <Header history={history} isLogged={isLogged} bgColor="dark" />
      <div className="searched-plans">

        {plans ? plans.map((plan) => (
          <Plan key={plan._id} plan={plan} isLogged={isLogged} />
        )) : null}

        {dances ? dances.map((plan) => (
          <Dance key={plan._id} dance={plan} isLogged={isLogged} />
        )) : null}

      </div>
    </React.Fragment>
  ) 
};

export default memo(SearchedResults);
