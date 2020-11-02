import React from 'react';
import './Login.css';
import withForm from '../shared/hocs/withForm';
import userService from '../services/user-service';
import {userContext} from '../userContext';
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
    login = async (history, data) => {
        // return userService.login(data).then((res) => {
          
        //   this.setState({isLogged: true, userData: res});
        //   history.push('/')
        // });
        console.log(data);
        await this.props.loginUser(data);
        this.props.loginStateChange()
        history.push('/')
    }
    submitHandler = () => {
        const errors = this.getErrorsState();
        if(!!errors) {
            return;
        }
        const data = this.getFormState();
        
        this.login(this.props.history, data)
        
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