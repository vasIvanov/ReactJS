import React from 'react';
import './Create-Post.css';
import Posts from '../Posts'

export default function CreatePost() {
    return <div className="Input">
        <form>
            <textarea></textarea>
            <button>Post</button>
        </form>
        <Posts />
    </div>
}