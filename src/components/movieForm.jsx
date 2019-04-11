import React from 'react';

const MovieForm = ({ history, match }) => {
  return (
    <main className="container">
      <h1>Movie Form {match.params.id}</h1>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => history.push('/movies')}
      >
        Save
      </button>
    </main>
  );
};

export default MovieForm;
