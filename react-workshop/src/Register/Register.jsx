import React from 'react';
import './Register.css';
import * as yup from 'yup';
import {connect} from 'react-redux';
import {registerUser} from '../actions/userActions';



class Register  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
                rePassword: ''
            },
            errors: null
        };
    }
    // usernameOnChangeHandler = this.controlChangeHandler('username');
    // passwordOnChangeHandler = this.controlChangeHandler('password');
    // rePasswordOnChangeHandler = this.controlChangeHandler('rePassword');

    controlChangeHandler = name => e => {
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
        // this.props.runValidations().then(() => {
        //     const errors = this.props.getErrorsState();
        //     if(!!errors) {
        //         return;
        //     }
        //     const data = this.props.getFormState();
            // userService.register(data).then(() => {
            //     this.props.history.push('/login')
            // })
        try{
            await schema.validate(this.state.form, {abortEarly: false})
            await this.props.registerUser(this.state.form);
            this.props.history.push('/');
        } catch(err)  {
            const errors = err.inner.reduce((acc, {path, message}) => {
                acc[path] = (acc[path] || []).concat(message);
                return acc;
            }, {})
            this.setState({ errors })
        }
        // .then(() => this.state.form).catch(err => {
        //     const errors = err.inner.reduce((acc, {path, message}) => {
        //         acc[path] = (acc[path] || []).concat(message);
        //         return acc;
        //     }, {})
        //     this.setState({ errors })
            
        // })

        // })
    }

    getFirstInputError = name => {
        const errorState = this.getErrorsState();
        return errorState && errorState[name] && errorState[name][0];
    }

    render(){
        const { username, password, rePassword } = this.getFormState();
        const usernameError = this.getFirstInputError('username');
        const passwordError = this.getFirstInputError('password');
        const rePasswordError = this.getFirstInputError('rePassword');
        
        return (
            <form className="Register">
                <div className="form-control">
                    <label>Username</label>
                    <input type="text" onChange={this.controlChangeHandler('username')} value={username} />
                    {usernameError && <div className='error'>{usernameError}</div>}
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" onChange={this.controlChangeHandler('password')} value={password}/>
                    {passwordError && <div className='error'>{passwordError}</div>}
                </div>
                <div className="form-control">
                    <label>Re Password</label>
                    <input type="password" onChange={this.controlChangeHandler('rePassword')} value={rePassword}/>
                    {rePasswordError && <div className='error'>{rePasswordError}</div>}
                </div>
                <div className="form-control">
                    <button type="button" onClick={this.submitHandler}>Register</button>
                </div>
            </form>
        )
    }
    
}


const schema = yup.object({
    username: yup.string('username must be a string').required('username is required').min(4, 'username must be 4 or more chars'),
    password: yup.string('Password must be a string').required('Password is required').min(6, 'Password must be 6 or more chars'),
    rePassword: yup.string('Password must be a string').oneOf([yup.ref('password'), null], 'Passwords dont match').required('Password is required').min(6, 'Password must be 6 or more chars')
});

// export default withForm(Register, initialFormState, schema);
export default connect(
    (state) =>({posts: state.user.item}),
        {
            registerUser
        }
)(Register);