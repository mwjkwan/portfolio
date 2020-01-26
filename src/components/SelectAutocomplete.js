import React, { Component } from 'react';

import Autocomplete from 'react-autocomplete-select';

export default class SelectAutocomplete extends Component {
  inputRef = React.createRef();

  state = {
    changedValue: '',
  };

  render() {
    const {
      itemsData,
      placeholder,
      className,
      name,
      handleInputChange,
      value,
    } = this.props;
    return (
      <div>
        <Autocomplete
          className={className}
          name={name}
          value={value || ''}
          inputRef={this.inputRef}
          searchPattern={'containsString'}
          selectOnBlur={false}
          placeholder={placeholder}
          maxOptionsLimit={10}
          searchEnabled={true}
          onSelect={handleInputChange}
          onChange={changedValue => {
            this.setState({ changedValue: changedValue });
          }} // called every time the input values get changes
          getItemValue={item => {
            return item;
          }}
          itemsData={itemsData}
        />
      </div>
    );
  }
}
