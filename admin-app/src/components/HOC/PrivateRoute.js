import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} component = {(props) => {
    const token = window.localStorage.getItem('token');
    if(token) {
      return <Component {...props}/>
    }
    return <Redirect to = '/signin'/>
  }}/>;
};

export default PrivateRoute;