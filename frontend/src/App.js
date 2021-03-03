import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './containers/HomePage/HomePage';
import ProductListPage from './containers/ProductListPage/ProductListPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </div>
  );
}

export default App;
