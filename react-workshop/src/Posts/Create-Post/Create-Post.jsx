import React from 'react';
import Posts from '../Posts';
import postService from '../../services/post-service';
import './Create-Post.css';
import {createPost} from '../../actions/postActions';
import {connect} from 'react-redux';
import store from '../../store';

const CreatePost = ({ history, createPost, post }) => {
  const textareaRef = React.useRef();

  // const createPost = React.useCallback(() => {
  //   const value = textareaRef.current.value;
  //   postService.create({ description: value }).then(() => {
  //     history.push('/');
  //   });
  // }, [textareaRef, history]);
  console.log(store.getState());
  const submitPost = async () => {
    const value = textareaRef.current.value;
    await createPost({ description: value });
    history.push('/');

  }
  return <div className="CreatePost">
    <form>
      <textarea ref={textareaRef}></textarea>
      <button type="button" onClick={submitPost}>Create Post</button>
    </form>
    {post ? <div>{post.description}</div>: null}
    <Posts limit={3} />
  </div>;
}

export default connect(
  (state) => ({post: state.posts.item}),
    {
      createPost
    }
)(CreatePost);