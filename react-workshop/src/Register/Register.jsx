import React from 'react';
import './Register.css'

const Register = () => {
    return (
        <form className="Register">
            <div className="form-control">
                <label>Username</label>
                <input type="text"/>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password"/>
            </div>
            <div className="form-control">
                <label>Re Password</label>
                <input type="password"/>
            </div>
            <div className="form-control">
                <button>Register</button>
            </div>
        </form>
    )
}

export default Register;