/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';

const checkboxesStyle = css`
  .choice {
    font-size: 16px;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-right: 7px;
  }

  .choice-icon {
    width: 16px;
    height: 16px;
    background: #f9c6c3;
    border: 2px solid #bd574e;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
  }

  .choice-icon-checked {
    width: 16px;
    height: 16px;
    background: #6c2c2c;
    border: 2px solid #bd574e;
    display: inline-block;
    font-size: 10px;
    color: #ffffff;
    line-height: 13px;
    vertical-align: middle;
    text-align: center;
    margin-right: 4px;

    i {
      margin-left: 1px;
    }
  }
`;

export default class Checkboxes extends Component {
  render() {
    const { handleClick, name, responses, values } = this.props;

    const labels = this.props.labels || responses;

    return (
      <div css={checkboxesStyle}>
        {responses.map((response, index) => {
          return (
            <div
              className="choice"
              key={response}
              onClick={() => handleClick(name, response)}
            >
              {values && values[response] ? (
                <div className="choice-icon-checked">
                  <i className="fas fa-check" />
                </div>
              ) : (
                <div className="choice-icon"></div>
              )}
              {labels[index]}
            </div>
          );
        })}
      </div>
    );
  }
}
