import React from 'react';
import './Post.css';

function Post({ imageUrl, children, author }) {
    return <div className='Post'>
        <div className="media">
            <img src={imageUrl} alt=""/>
        </div>
        <p className="description">
            {children}
        </p>
        <div>
            <span>
                <small>Author: </small>
                {author}
            </span>
        </div>
    </div>
}

export default Post;