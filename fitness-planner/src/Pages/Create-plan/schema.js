import * as yup from 'yup';

const schema = yup.object({
  planName: yup
    .string('Plan name must be a string')
    .required('Plan name is required')
    .min(4, 'plan name must be 4 or more chars')
    .max(150, 'Plan name must be 150 char max'),
  planImage: yup
    .string('Image url must be a string')
    .required('Image url is required')
    .min(6, 'Image url must be 6 or more chars'),
  planDetails: yup
    .string('Plan details must be a string')
    .required('Plan details is required')
    .min(6, 'Plan details must be 6 or more chars')
    .max(2500, 'Plan details must be 500 chars max'),
});

function validate(planName, planImage, planDetails) {
  return schema.validate(
    { planName, planImage, planDetails },
    { abortEarly: false }
  );
}

export default validate;
