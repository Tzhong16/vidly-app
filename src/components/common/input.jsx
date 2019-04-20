import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* the params outside input element can be looked as 
      the default need params that should not include in the rest operator  */}
      <input
        // value={value}
        // onChange={onChange}
        // type={type}
        {...rest}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
