import React from 'react';

const Textarea = props => (
  <div>
    <textarea
      className={props.className}
      maxLength={300}
      name={props.name}
      onChange={props.handleInputChange}
      placeholder={props.placeholder || props.name}
      rows={props.rows}
      type={props.type}
      value={props.value}
    />
  </div>
);

export default Textarea;
