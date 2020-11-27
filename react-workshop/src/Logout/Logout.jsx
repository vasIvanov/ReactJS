import {logoutUser} from '../actions/userActions'
import {connect} from 'react-redux';


function Logout({history, logoutUser, isLoggedStateChange}) {
    const loggingOut = async () => {
        await logoutUser()
        isLoggedStateChange('logout')
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