import React from 'react';

const Select = props => (
  <div>
    <select
      className={props.className}
      name={props.name}
      onChange={props.handleInputChange}
      value={props.value || ''}
    >
      <option value="" disabled>
        {props.placeholder}
      </option>
      {props.values.map((value, index) => {
        const displayLabel = props.labels ? props.labels[index] : value;
        return (
          <option key={displayLabel} value={value}>
            {displayLabel}
          </option>
        );
      })}
    </select>
  </div>
);

export default Select;
