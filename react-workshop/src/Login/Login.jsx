import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <form className="Login">
            <div className="form-control">
                <label>Username</label>
                <input type="text"/>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password"/>
            </div>
            <div className="form-control">
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login;