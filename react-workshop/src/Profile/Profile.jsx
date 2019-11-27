import React from 'react';
import './Profile.css'
import Posts from '../Posts/Posts'

export default function () {
    return <div className="Profile">
        <div className="personal-info">
            <img src="" alt=""/>
            <p>
                <span>Email</span>
                test@abv.bg
            </p>
            <p>
                <span>Posts</span>
                2
            </p>
        </div>
        <Posts />
    </div>
}