import React from 'react';
import './Login.css';
import withForm from '../shared/hocs/withForm';
import userService from '../services/user-service';

class Login extends React.Component {

    usernameChangeHandler = this.props.controlChangeHandler('username');
    passwordChangeHandler = this.props.controlChangeHandler('password');

    submitHandler = () => {
        const errors = this.props.getErrorsState();
        if(!!errors) {
            return;
        }
        const data = this.props.getFormState();
        this.props.login(this.props.history, data)
    }

    render(){
        return (
            <form className="Login">
                <div className="form-control">
                    <label>Username</label>
                    <input type="text" onChange={this.usernameChangeHandler}/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" onChange={this.passwordChangeHandler}/>
                </div>
                <div className="form-control">
                    <button type="button" onClick={this.submitHandler}>Login</button>
                </div>
            </form>
        )
    }
    
}

export default withForm(Login, {username: '', password: ''});