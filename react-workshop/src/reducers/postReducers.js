const { FETCH_POSTS, CREATE_POST, SORT_BY_LENGTH, SORT_BY_DATE } = require("../types");

export const postsReducer = (state = {}, action) => {
  switch(action.type){
    case CREATE_POST:
      return {...state, item: action.payload.createdPost };
    case SORT_BY_LENGTH:
      return {...state, items: action.payload};
    case SORT_BY_DATE:
      return {...state, items: action.payload};
    case FETCH_POSTS:
      return {items: action.payload };
    default:
      return state;
  }
}