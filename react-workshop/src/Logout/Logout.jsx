import React from 'react';
import userService from '../services/user-service';
import {logoutUser} from '../actions/userActions'
import {connect} from 'react-redux';


function Logout({history, logoutUser, logoutStateChange}) {
    const loggingOut = async () => {
        await logoutUser()
        logoutStateChange()
    }
    loggingOut()
    history.push('/')
    // logoutUser();
    return null;
}  



// export default Logout;
export default connect(
    (state) => ({user: state.user.user}),
      {
        logoutUser
      }
  )(Logout);