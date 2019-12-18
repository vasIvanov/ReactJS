import React from 'react';
import './Profile.css'
import Posts from '../Posts/Posts'

export default function ({userData}) {
    

    return <div className="Profile">
        <div className="personal-info">
            <img src="" alt=""/>
            <p>
                <span>Username: </span>
                {userData.username}
            </p>
            <p>
                <span>Posts: </span>
                {userData.posts.length}
            </p>
        </div>
        <Posts userId={userData._id} />
    </div>
}