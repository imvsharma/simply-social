import React from 'react';

import './post.scss';
import UserProfilePic from '../user-profile-pic/userprofilepic';

export default class Post extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div className="post-container">
                    <div className="post-header">
                        <UserProfilePic />
                    </div>
                    <div className="post1">
                        <video width="600" height="400" controls>
                            <source src="https://res.cloudinary.com/taskmanagerreact/video/upload/v1566326913/trailer_400p_xz9m83.ogv" type="video/ogg" />
                            Your browser does not support HTML5 video.
                        </video>
                    </div>
                </div>

                {/* <div className="post-container">
                    <div className="post-header">
                        <UserProfilePic />
                    </div>
                    <div className="post"></div>
                </div> */}
            </React.Fragment>
            
        )
    }
}
