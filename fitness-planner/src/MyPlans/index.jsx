import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header';
import planService from '../services/plan-service';
import { useContext } from 'react';
import { userContext } from '../userContext';
import Plan from '../Plans/Plan';

const MyPlans = ({ isLogged, history }) => {
  const userValue = useContext(userContext);
  const insId =
    (userValue && userValue._id) || localStorage.getItem('_id') || null;
  const [myPlans, setMyPlans] = useState('');

  useEffect(() => {
    planService.load(null, null, insId).then((plans) => {
      setMyPlans(plans);
    });
  }, [insId]);
  return (
    <Fragment>
      <Header history={history} isLogged={isLogged} bgColor="dark" />
      {myPlans ? (
        <div className="plans-tabs">
          <div className="plans">
            {myPlans.map((plan, i) => (
              <Plan history={history} key={i} plan={plan} isLogged={isLogged} />
            ))}
          </div>
        </div>
      ) : (
        'Loading ...'
      )}

      {myPlans.length < 1 && (
        <div className="no-plans-fallback">
          <p>You havent created any plans yet!</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyPlans;
