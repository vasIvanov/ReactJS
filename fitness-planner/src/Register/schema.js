import * as yup from 'yup';

const schema = yup.object({
    username: yup.string('username must be a string').required('username is required').min(4, 'username must be 4 or more chars').max(25, 'Username must be 25 char max'),
    password: yup.string('Password must be a string').required('Password is required').min(6, 'Password must be 6 or more chars').max(25, 'Password must be 25 chars max'),
    rePassword: yup.string('Password must be a string').oneOf([yup.ref('password'), null], 'Passwords dont match').required('Password is required').min(6, 'Password must be 6 or more chars').max(12, 'Password must be 12 chars max')
});

function validate(username, password, rePassword) {
    return schema
    .validate({username, password, rePassword}, {abortEarly: false})
}

export default validate;