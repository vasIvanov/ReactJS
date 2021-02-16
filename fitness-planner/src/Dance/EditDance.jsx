import React, { useState, Fragment, useEffect } from 'react';
import danceServices from '../services/dance-service';
import CreateDance from './Create-dance';

const EditPlan = ({ isLogged, match, history, showChange }) => {
  const danceId = match.params.id;
  const [dance, setDance] = useState('');
  useEffect(() => {
    danceServices.load(danceId).then((dance) => {
      setDance(dance);
    });
  }, [danceId]);
  return (
    <Fragment>
      <CreateDance history={history} showChange={showChange} editDance={dance} />
    </Fragment>
  );
};

export default EditPlan;
