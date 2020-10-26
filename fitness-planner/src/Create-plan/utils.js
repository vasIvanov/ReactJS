import validate from './schema';
import planService from '../services/plan-service';

export const checkButton = (days, setButtonActive, urlStatus, ...args) => {
  if (days === '2' && urlStatus) {
    setButtonActive(
      (args[0][0] !== '') !== '' && args[1][0] !== '' && urlStatus
    );
  } else if (days === '3') {
    setButtonActive(
      args[0][0] !== '' && args[1][0] !== '' && args[2][0] !== '' && urlStatus
    );
  } else if (days === '4') {
    setButtonActive(
      args[0][0] !== '' &&
        args[1][0] !== '' &&
        args[2][0] !== '' &&
        args[3][0] !== '' &&
        urlStatus
    );
  } else if (days === '5') {
    setButtonActive(
      args[0][0] !== '' &&
        args[1][0] !== '' &&
        args[2][0] !== '' &&
        args[3][0] !== '' &&
        args[4][0] !== '' &&
        urlStatus
    );
  } else if (days === '6') {
    setButtonActive(
      args[0][0] !== '' &&
        args[1][0] !== '' &&
        args[2][0] !== '' &&
        args[3][0] !== '' &&
        args[4][0] !== '' &&
        args[5][0] !== '' &&
        urlStatus
    );
  } else if (days === '7') {
    setButtonActive(
      args[0][0] !== '' &&
        args[1][0] !== '' &&
        args[2][0] !== '' &&
        args[3][0] !== '' &&
        args[4][0] !== '' &&
        args[5][0] !== '' &&
        args[6][0] !== '' &&
        urlStatus
    );
  }
};

export const validateAndCreatePlan = (
  planName,
  planImage,
  planDetails,
  editPlan,
  data,
  setServerError,
  showChange,
  history,
  setNameError,
  setImageUrlError,
  setDetailsError
) => {
  validate(planName, planImage, planDetails)
    .then(() => {
      if (editPlan) {
        const planId = editPlan._id;
        planService.update(planId, data).then((plan) => {
          if (plan.errMsg) {
            setServerError(plan.errMsg);
            window.scrollTo(0, 0);
            return;
          }
          showChange();
          history.push('/');
        });
      } else {
        planService.create(data).then((e) => {
          if (e.errMsg) {
            setServerError(e.errMsg);
            window.scrollTo(0, 0);
            return;
          }
          showChange();
          history.push('/');
        });
      }
    })
    .catch((err) => {
      err.inner.forEach((error) => {
        if (error.path === 'planName') {
          setNameError(error.message);
        } else if (error.path === 'planImage') {
          setImageUrlError(error.message);
        } else if (error.path === 'planDetails') {
          setDetailsError(error.message);
        }
      });
      window.scrollTo(0, 0);
    });
};
