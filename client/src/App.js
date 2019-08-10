import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {store} from './_helpers/store'
import './App.css';
import history from './_helpers/history';
import Account from './_pages/accounts/accounts';
//import Login from './_pages/login/login';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Router history={history}>
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

export default connect(mapStateToProps)(App) ;
