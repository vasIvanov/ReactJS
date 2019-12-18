import React from 'react';
import Posts from '../Posts';
import postService from '../../services/post-service';
import './Create-Post.css';

const CreatePost = ({ history }) => {
  const textareaRef = React.useRef();

  const createPost = React.useCallback(() => {
    const value = textareaRef.current.value;
    postService.create({ description: value }).then(() => {
      history.push('/');
    });
  }, [textareaRef, history]);

  return <div className="CreatePost">
    <form>
      <textarea ref={textareaRef}></textarea>
      <button type="button" onClick={createPost}>Create Post</button>
    </form>
    <Posts limit={3} />
  </div>;
}

export default CreatePost;