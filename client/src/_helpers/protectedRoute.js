import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('user') || props.match.params.id
        ? <Component {...props} />
        : <Redirect to='/accounts/login' />
    )} />)

export default ProtectedRoute;