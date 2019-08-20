import React from 'react';
import './home.scss';
import Post from '../../_components/post/post';


export default class Home extends React.Component {
    render () {
        return (
            <div className="container">
                <Post />
            </div>
        )
    }
}