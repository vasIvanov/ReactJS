import React from 'react';
import './Posts.css';
import Post from './Post/Post';
import postService from '../services/post-service';

class Posts extends React.Component {
    state = {
        posts: null
    };

    componentDidMount() {
        postService.load().then(posts => {

            this.setState({ posts });
        });
    }

    render() {
        const {posts} = this.state;
        return posts ? <div className='Posts'>
            {posts.map(post => <Post key={post.id} imageUrl="/logo192.png" author={post.author.username}>{post.description}</Post>)}
                 
        </div> : <div>Loading...</div>
    }
}

// function Posts() {
//     return <div className='Posts'>
//         <Post imageUrl="/logo192.png" author="Me">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet in qui illo. Quod fugiat similique facere repellat enim, quas, ex maiores ipsum eius officia libero cum itaque, tenetur reprehenderit ratione animi quia rerum fugit laborum vero quibusdam dolor. Maiores natus, voluptates dolor eaque nihil enim alias quae. Minus, rerum dolores?</Post>
//     </div>
// }

export default Posts;