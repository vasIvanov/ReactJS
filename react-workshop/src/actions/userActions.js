import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "../types";

export const registerUser = (userData) => async (dispatch) => {
  const res = await fetch(`/api/user/register`,{
    body: JSON.stringify(userData),
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
  });
  const registeredUser = await res.json();
  dispatch({
    type: REGISTER_USER,
    payload: registeredUser
  })
}

export const loginUser = (userData) => async (dispatch) => {
  const res = await fetch(`/api/user/login`,{
    body: JSON.stringify(userData),
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    credentials: 'include'
});
  const user = await res.json();
  dispatch({
    type: LOGIN_USER,
    payload: user
  })
}

export const logoutUser = () => async (dispatch) => {
  await fetch(`http://localhost:9999/api/user/logout`,{
    method: 'POST',
    credentials: 'include'
  });
  dispatch({type: LOGOUT_USER})
}
