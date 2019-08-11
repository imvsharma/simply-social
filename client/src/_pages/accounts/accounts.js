import React, {Component} from 'react';
import {Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './accounts.scss';
import history from '../../_helpers/history';
import Login from './login/login';
import Signup from './signup/signup';

class Account extends Component {
    

    render() {
        return(
            <React.Fragment>
                <div id="appname">SimplySocial</div>
                <div id="authform">
                    <Router history={history}>
                        <Route path="/accounts/login" component={Login} />
                        <Route path="/accounts/signup" component={Signup} />
                    </Router>
                </div>
            </React.Fragment>
            
        ) 
    }
}


const mapStateToProps = (state) => {
    const { authentication } = state;
    return {
      authentication
    }
  }
  
export default connect(mapStateToProps)(Account);