import * as yup from 'yup';

const schema = yup.object({
  username: yup
    .string('username must be a string')
    .required('username is required')
    .min(4, 'Invalid username or password')
    .max(25, 'Invalid username or password'),
  password: yup
    .string('Password must be a string')
    .required('Password is required')
    .min(6, 'Invalid username or password')
    .max(25, 'Invalid username or password'),
});

async function validate(username, password) {
  return await schema.validate({ username, password }, { abortEarly: false });
}

export default validate;
