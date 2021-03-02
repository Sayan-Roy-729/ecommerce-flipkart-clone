import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './containers/Home/home';
import Signin from './containers/Signin/signin';
import Signup from './containers/Signup/signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn, getInitialData } from './actions/index';
import Products from './containers/Products/Products';
import Orders from './containers/Orders/Orders';
import Category from './containers/Category/category';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // After refresh the page, check if user is authenticated or not.
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
