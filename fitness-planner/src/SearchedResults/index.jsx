import React, { useState } from 'react';
import planService from '../services/plan-service';
import { useEffect } from 'react';
import Plan from '../Plans/Plan';
import Header from '../Header';
import './index.css';

const SearchedResults = ({ match, isLogged }) => {
  const query = match.params.query;
  const [plans, setPlans] = useState('');

  useEffect(() => {
    planService.load(null, null, null, query).then((r) => {
      setPlans(r);
    });
  }, [query]);

  return plans ? (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      <div className="searched-plans">
        {plans.map((plan) => (
          <Plan key={plan._id} plan={plan} isLogged={isLogged} />
        ))}
      </div>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default SearchedResults;
