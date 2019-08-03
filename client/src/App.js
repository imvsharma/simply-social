import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import history from './_helpers/history';
import Login from './_pages/login/login';


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={Login} />
      </Router>
    </div>
  );
}

export default App;
