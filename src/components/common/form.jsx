import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //const result = Joi.validate(this.state.data, this.schema, options);

    //console.log(result);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    // old validate method
    // const errors = {};
    // const { data } = this.state;
    // if (data.username.trim() === '')
    //   errors.username = 'Username is required.';
    // if (data.password.trim() === '')
    //   errors.password = 'Password is required.';

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  //validate Signle field
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
}

export default Form;
