import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import CitiesExplore from './containers/CitiesExplore/CitiesExplore';

export function App() {
  return (
    <div className="app">
      <Layout>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/explore" exact component={CitiesExplore} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
