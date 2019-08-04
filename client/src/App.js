import React from 'react';
import {Router, Route} from 'react-router-dom';
import './App.css';
import history from './_helpers/history';
import Account from './_pages/accounts/accounts';
//import Login from './_pages/login/login';



function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/accounts" component={Account} />
      </Router>
    </div>
  );
}

export default App;
