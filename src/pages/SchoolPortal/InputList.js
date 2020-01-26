import React, { Component } from 'react';

export default class InputList extends Component {
  onClick = () => {
    const { addInput, name } = this.props;
    addInput(name);
  };

  render() {
    let { inputs } = this.props;

    let dict = {};
    for (var i = 0; i < inputs.length; i++) {
      dict[i] = inputs[i];
    }

    return (
      <div>
        <div>
          {Object.keys(dict).map(index => (
            <Input index={index} inputs={dict} key={index} {...this.props} />
          ))}
        </div>
        <div className="roundbutton" onClick={this.onClick}>
          <i className="fas fa-plus buttonsymbol"></i>
        </div>
      </div>
    );
  }
}

class Input extends Component {
  onChange = event => {
    const { editInput, index, inputs, name } = this.props;
    editInput(index, event.target.value, inputs, name);
  };

  onClick = () => {
    const { index, inputs, name, removeInput } = this.props;
    removeInput(index, inputs, name);
  };

  render() {
    const { index, inputs } = this.props;

    return (
      <div className="inputcontainer">
        <input
          className="input"
          onChange={this.onChange}
          type="text"
          value={inputs[index]}
        />
        <div className="roundbutton" onClick={this.onClick}>
          <i className="fas fa-minus buttonsymbol"></i>
        </div>
      </div>
    );
  }
}
