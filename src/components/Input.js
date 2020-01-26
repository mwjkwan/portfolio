import React from 'react';

const Input = props => (
  <div>
    {props.text && <div style={{ marginBottom: 5 }}>{props.text}</div>}
    <input
      className={props.className}
      name={props.name}
      onChange={props.handleInputChange}
      onKeyPress={props.onKeyPress || null}
      placeholder={props.placeholder || props.name}
      type={props.type}
      value={props.value}
    />
  </div>
);

export default Input;
