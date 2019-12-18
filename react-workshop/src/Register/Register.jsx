import React from 'react';
import './Register.css';
import withForm from '../shared/hocs/withForm';
import * as yup from 'yup';
import userService from '../services/user-service';




class Register  extends React.Component {

    usernameOnChangeHandler = this.props.controlChangeHandler('username');
    passwordOnChangeHandler = this.props.controlChangeHandler('password');
    rePasswordOnChangeHandler = this.props.controlChangeHandler('rePassword');

    submitHandler = () => {
        
        this.props.runValidations().then(() => {
            const errors = this.props.getErrorsState();
            if(!!errors) {
                return;
            }
            const data = this.props.getFormState();
            userService.register(data).then(() => {
                this.props.history.push('/login')
            })
        })
        
    }

    getFirstInputError = name => {
        const errorState = this.props.getErrorsState();
        return errorState && errorState[name] && errorState[name][0];
    }

    render(){
        const { username, password, rePassword } = this.props.getFormState();
        const usernameError = this.getFirstInputError('username');
        const passwordError = this.getFirstInputError('password');
        const rePasswordError = this.getFirstInputError('rePassword');
        
        return (
            <form className="Register">
                <div className="form-control">
                    <label>Username</label>
                    <input type="text" onChange={this.usernameOnChangeHandler} value={username} />
                    {usernameError && <div className='error'>{usernameError}</div>}
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" onChange={this.passwordOnChangeHandler} value={password}/>
                    {passwordError && <div className='error'>{passwordError}</div>}
                </div>
                <div className="form-control">
                    <label>Re Password</label>
                    <input type="password" onChange={this.rePasswordOnChangeHandler} value={rePassword}/>
                    {rePasswordError && <div className='error'>{rePasswordError}</div>}
                </div>
                <div className="form-control">
                    <button type="button" onClick={this.submitHandler}>Register</button>
                </div>
            </form>
        )
    }
    
}
const initialFormState = {
    username: '',
    password: '',
    rePassword: ''
}

const schema = yup.object({
    username: yup.string('username must be a string').required('username is required').min(4, 'username must be 4 or more chars'),
    password: yup.string('Password must be a string').required('Password is required').min(6, 'Password must be 6 or more chars'),
    rePassword: yup.string('Password must be a string').oneOf([yup.ref('password'), null], 'Passwords dont match').required('Password is required').min(6, 'Password must be 6 or more chars')
});

export default withForm(Register, initialFormState, schema);