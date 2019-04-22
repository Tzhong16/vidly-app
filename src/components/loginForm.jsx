import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = async () => {
    //call the server save the change
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      // this.props.history.push('/');
      window.location = state ? state.from.pathname : '/';
      // console.log(jwt);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

    console.log('Submitted');
  };

  render() {
    // const { data, errors } = this.state;
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          {/* <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          /> */}

          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
