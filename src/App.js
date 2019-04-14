import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import NotFound from './components/notFound';
import NavBar from './components/navBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
