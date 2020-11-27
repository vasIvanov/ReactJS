import React from 'react';
import './Login.css';
import {loginUser} from '../actions/userActions';
import {connect} from 'react-redux';
import store from '../store';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
            },
            errors: null
        };
    }
    // usernameChangeHandler = this.props.controlChangeHandler('username');
    // passwordChangeHandler = this.props.controlChangeHandler('password');
    controlChangeHandler = name => e => {
        console.log(name);
        const newValue = e.target.value;
        this.setState(({ form }) => {
            return { form:  { ...form, [name]: newValue }};
        });
    }

    getFormState = () => {
        return this.state.form;
    }

    getErrorsState = () => {
        return this.state.errors
    }
    
    submitHandler = async() => {
        const errors = this.getErrorsState();
        if(!!errors) {
            return;
        }
        const data = this.getFormState();
        
        await this.props.loginUser(data);
        this.props.isLoggedStateChange('login')
        this.props.history.push('/')
        
    }

    render(){
        const {error} = this.state;
        console.log(store.getState());
        return (
            <form className="Login">
                <div className="form-control">
                    <label>Username</label>
                    <input type="text" onChange={this.controlChangeHandler('username')}/>
                   
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" onChange={this.controlChangeHandler('password')}/>
                </div>
                {error ? 
                    <div>{error}</div> : null
                }
                <div className="form-control">
                    <button type="button" onClick={this.submitHandler}>Login</button>
                </div>
            </form>
        )
    }
    
}

// export default withForm(Login, {username: '', password: ''});
export default connect(
    (state) => ({user: state.user.user}),
      {
        loginUser
      }
  )(Login);