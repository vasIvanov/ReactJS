import * as yup from 'yup';

const schema = yup.object({
  danceName: yup
    .string('dance name must be a string')
    .required('dance name is required')
    .min(3, 'dance name must be 3 or more chars')
    .max(150, 'dance name must be 150 char max'),
  danceDetails: yup
    .string('dance details must be a string')
    .required('dance details is required')
    .min(4, 'dance details must be 4 or more chars'),
});

function validate(danceName, danceDetails) {
  return schema.validate({ danceName, danceDetails }, { abortEarly: false });
}

export default validate;
