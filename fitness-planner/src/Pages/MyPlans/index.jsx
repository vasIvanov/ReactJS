import React, { Fragment, useEffect } from 'react';
import Plan from '../../Components/Plan';
import Dance from '../../Components/Dance/Dance';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCreatedDances } from '../../features/danceSlice';
import { getUserCreatedPlans } from '../../features/planSlice';

const MyPlans = ({ isLogged, history }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const userCreatedDances = useSelector(state => state.dance.userCreatedDances);
  const userCreatedPlans = useSelector(state => state.plan.userCreatedPlans)
  const insId =
    (user && user._id) || localStorage.getItem('_id') || null;

  useEffect(() => {
    if(userCreatedPlans === null) {
      dispatch(getUserCreatedPlans(insId))
    }
    if(userCreatedDances === null){
      dispatch(getUserCreatedDances(insId))
    }
  }, [insId, dispatch, userCreatedDances, userCreatedPlans]);
  return (
    <Fragment>
      {userCreatedPlans ? (
        <div className="plans-tabs">
          <div className="plans">
            {userCreatedPlans.map((plan, i) => (
              <Plan history={history} key={i} plan={plan} isLogged={isLogged} />
            ))}
          </div>
        </div>
      ) : (
        'Loading ...'
      )}

      {userCreatedDances ? (
        <div className="plans-tabs">
          <div className="plans">
            {userCreatedDances.map((dance, i) => (
              <Dance history={history} key={i} dance={dance} isLogged={isLogged} />
            ))}
          </div>
        </div>
      ) : (
        'Loading ...'
      )}

      {userCreatedDances && userCreatedPlans && userCreatedPlans.length < 1 && userCreatedDances.length < 1 && (
        <div className="no-plans-fallback">
          <p>You havent created anything yet!</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyPlans;
