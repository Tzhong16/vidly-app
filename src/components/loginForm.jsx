import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import Input from './common/input';

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

  doSubmit = () => {
    //call the server save the change
    console.log('Submitted');
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
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
          />

          {/* {this.renderInput('username', 'Username')} */}
          {/* {this.renderInput('password', 'Password')} */}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
