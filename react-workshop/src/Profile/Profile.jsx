/*eslint-disable no-undef */
import React from 'react';
import './Profile.css'
import Posts from '../Posts/Posts'
import userService from '../services/user-service'
import store from '../store'

export default function () {
    const userValue = store.getState().user.user;
    
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'dhkrkvztl', 
        apiKey: '273427412511793',
        uploadPreset: 'testing'
    }, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info.url); 
            userValue.imageUrl = result.info.url;
            
            userService.update(userData)
          }
        }
    )
    

    return <div className="Profile">
        <div className="personal-info">
            {userValue && userValue.imageUrl ? <img src={userValue.imageUrl ? `${userValue.imageUrl}` : ''} alt=""/> : null}
            
            <p>
                <span>Username: </span>
                {userValue.username}
            </p>
            <p>
                <span>Posts: </span>
                {`${userValue.posts.length}`}
            </p>
        </div>
        <button type='button' onClick={() => myWidget.open()} >Upload files</button>
        <Posts userId={userValue._id} />
    </div>
}