import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'

import history from './_helpers/history';
import ProtectedRoute from './_helpers/protectedRoute';

import Account from './_pages/accounts/accounts';
import Home from './_pages/home/home';

import './App.css';

class App extends Component{
  
  render () {
    return (
      <div className="App">
        <Router history={history}>
          <ProtectedRoute exact path="/:id" component={Home} />
          <Route path="/accounts" component={Account} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    authentication
  }
}

export default connect(mapStateToProps)(App);
