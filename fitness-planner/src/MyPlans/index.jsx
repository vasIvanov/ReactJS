import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header';
import planService from '../services/plan-service';
import danceService from '../services/dance-service';
import { useContext } from 'react';
import { userContext } from '../userContext';
import Plan from '../Plans/Plan';
import Dance from '../Dance/Dance';

const MyPlans = ({ isLogged, history }) => {
  const userValue = useContext(userContext);
  const insId =
    (userValue && userValue._id) || localStorage.getItem('_id') || null;
  const [myPlans, setMyPlans] = useState('');
  const [myDances, setMyDances] = useState('');

  useEffect(() => {
    planService.load(null, null, insId).then((plans) => {
      setMyPlans(plans);
    });
    danceService.load(null, null, insId).then((dances) => {
      setMyDances(dances);
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

      {myDances ? (
        <div className="plans-tabs">
          <div className="plans">
            {myDances.map((dance, i) => (
              <Dance history={history} key={i} dance={dance} isLogged={isLogged} />
            ))}
          </div>
        </div>
      ) : (
        'Loading ...'
      )}

      {myPlans.length < 1 && myDances.length < 1 && (
        <div className="no-plans-fallback">
          <p>You havent created anything yet!</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyPlans;
