import userService from '../services/user-service';

export function loginFunc(setIsLogged, setUserData, setShow, setMessage) {
    return (history, data) => {
        return userService.login(data).then((res) => {
          setIsLogged(true); setUserData(res); setShow(true); setMessage('Login Successful!');
          history.push('/')
        })
    }
}

export function logoutFunc(setIsLogged, setUserData, setShow, setMessage) {
    return (history) => {
        userService.logout().then(() => {
          setIsLogged(false); setUserData(null); setShow(true); setMessage('Logout Successful!');
          localStorage.removeItem('username');
          if(localStorage.getItem('city')) {
            localStorage.removeItem('city');
          }
          localStorage.removeItem('_id');
          localStorage.removeItem('instructor');
          history.push('/');
          return null;
        });
      }
}
