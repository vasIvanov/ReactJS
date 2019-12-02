import React from 'react'

const UsernameInput = ({ changeUsername, username }) => {
    return (
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={changeUsername} value={username} id="username" />
        </div>
    )
}

export default UsernameInput