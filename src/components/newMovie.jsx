import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class NewMovie extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      stock: '',
      rate: ''
    },
    errors: {}
  };

  render() {
    return (
      <div className="container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          <p style={{ marginBottom: 10 }}>Genre</p>
          <select
            name="genre"
            id="genre"
            label="Genre"
            value="genre"
            onChange={this.handleChange}
            className="custom-select"
            style={{ marginBottom: 15 }}
          >
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Thriller">Thriller</option>
          </select>
          {/* {this.renderInput('genre', 'Genre')} */}
          {this.renderInput('stock', 'Stock')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton('Save', () => this.props.history.push('/movies'))}
        </form>
      </div>
    );
  }
}

export default NewMovie;
