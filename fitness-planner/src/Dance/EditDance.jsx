import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CreateDance from './Create-dance';

const EditPlan = ({ isLogged, match, history, showChange }) => {
  const danceId = match.params.id;
  const dance = useSelector(state => state.dance.dances.find(dance => dance._id === danceId))
  return (
    <Fragment>
      <CreateDance history={history} showChange={showChange} editDance={dance} />
    </Fragment>
  );
};

export default EditPlan;
