import React from 'react';

import './post.scss';
import UserProfilePic from '../user-profile-pic/userprofilepic';

export default class Post extends React.Component {
    render () {
        return (
            <div className="post-container">
                <div className="post-header">
                    <UserProfilePic />
                </div>
                <div className="post"></div>
            </div>
        )
    }
}
