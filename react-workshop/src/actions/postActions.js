import { CREATE_POST, FETCH_POSTS, SORT_BY_LENGTH, SORT_BY_DATE } from '../types';

export const fetchPosts = (id, limit, userId) => async (dispatch) => {
  const res = await fetch(`/api/origami${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}${userId ? `?userId=${userId}` : ''}`);
  const data = await res.json();
  dispatch({
    type: FETCH_POSTS,
    payload: data
  });
}

export const createPost = (postData) => async (dispatch) => {
  console.log(postData);
  const res = await fetch(`/api/origami`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postData),
    credentials: 'include'
  });
  const data = await res.json();
  console.log(data);
  dispatch({
    type: CREATE_POST,
    payload: {
      createdPost: data
    }
  })
}

export const sortByLength = (posts, sort) => async (dispatch) => {    
  const sortedPosts = posts.slice();
  sortedPosts.sort((a, b) => 
    sort === 'shortest' ? a.description.length > b.description.length ? 1 : -1
    :
    a.description.length < b.description.length ? 1 : -1
  );
  dispatch({
    type: SORT_BY_LENGTH,
    payload:sortedPosts
  })
}

export const sortByDate = (posts, sort) => async (dispatch) => {
  const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) =>
      sort === 'newest' ? a._id < b._id ? 1 : -1
      :
      a._id > b._id ? 1 : -1
  );
  console.log(sortedPosts, sort);
  dispatch({
    type: SORT_BY_DATE,
    payload:sortedPosts
  })
}