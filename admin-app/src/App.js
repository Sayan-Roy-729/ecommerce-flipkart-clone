import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './containers/Home/home';
import Signin from './containers/Signin/signin';
import Signup from './containers/Signup/signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions/index';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // After refresh the page, check if user is authenticated or not.
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
