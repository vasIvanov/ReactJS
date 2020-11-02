import React, { useState, useEffect } from 'react';
import './Posts.css';
import Post from './Post/Post';
import postService from '../services/post-service';
import {fetchPosts, sortByLength, sortByDate} from '../actions/postActions';
import {connect} from 'react-redux';
import store from '../store';
const Posts = ({limit, userId, posts, fetchPosts, sortByLength, sortByDate, isLogged}) => {
    if(isLogged) {
        console.log(store.getState().user.user.username);

    }
    // const [posts, setPosts] = useState(null);
    useEffect(() => {
        // postService.load(null, limit, userId).then(posts => {
        //     setPosts(posts)
        // });
        fetchPosts(null, limit, userId);
        
    }, [limit, userId, fetchPosts])

    return posts ? <div className='Posts'>
        <button type="button" onClick={sortByLength.bind(null, posts, 'shortest')}>Sort by shortest</button>
        <button type="button" onClick={sortByLength.bind(null, posts, 'longest')}>Sort by longest</button>
        <button type="button" onClick={sortByDate.bind(null, posts, 'newest')}>Sort by newest</button>
        <button type="button" onClick={sortByDate.bind(null, posts, 'oldest')}>Sort by oldest</button>
        {/* {posts.map(post => <Post key={post._id} imageUrl="/logo192.png" author={post.author.username}>{post.description}</Post>)} */}
        {posts ? posts.map(post => <Post key={post._id} imageUrl="/logo192.png" author={post.author.username}>{post.description}</Post>) : posts.map(post => <Post key={post._id} imageUrl="/logo192.png" author={post.author.username}>{post.description}</Post>)}
                
    </div> : <div>Loading...</div>
    
}

// class Posts extends React.Component {
//     componentDidMount() {
//         console.log(fetchPosts);
//         this.props.fetchPosts();
//     }

//     render() {
//         return this.props.posts ? <div className='Posts'>
//             {this.props.posts.map(post => <Post key={post._id} imageUrl="/logo192.png" author={post.author.username}>{post.description}</Post>)}
                 
//         </div> : <div>Loading...</div>
//     }
// }

export default connect(
    (state) =>({posts: state.posts.items}),
        {
            fetchPosts,
            sortByLength,
            sortByDate 
        }
)(Posts);