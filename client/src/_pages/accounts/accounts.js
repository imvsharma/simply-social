import React, {Component} from 'react';
import {Router, Route, } from 'react-router-dom';

import './accounts.scss';
import history from '../../_helpers/history';
import Login from './login/login';

export default class Account extends Component {
    constructor (props) {
        super (props)
    }

    render() {
        return(
            <React.Fragment>
                <div id="appname">SimplySocial</div>
                <div id="authform">
                    <Router history={history}>
                        <Route path="/accounts/login" component={Login} />
                    </Router>
                </div>
            </React.Fragment>
            
        ) 
    }
}