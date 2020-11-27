const { REGISTER_USER, LOGIN_USER, LOGOUT_USER } = require("../types");

export const userReducer = (state = {}, action) => {
  switch(action.type){
    case REGISTER_USER:
      return {item: action.payload };
    case LOGIN_USER:
      return {user: action.payload, isLogged: true}
    case LOGOUT_USER:
      return {user: null, isLogged: false}
    default:
      return state;
  }
}

