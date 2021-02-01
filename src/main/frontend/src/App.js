import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MainNav from './Components/MainNav';

// Views
import ViewUsers from './Views/ViewUsers';
import CreateUser from './Views/CreateUser';
import Home from './Views/Home';


const App = (props) => {

  return (
    <>
      <BrowserRouter>
      <MainNav />
        <Switch>
          <Route path="/view-users" component={ViewUsers} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
