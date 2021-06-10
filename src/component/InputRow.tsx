import React from 'react';

class InputRow extends React.Component {
  render() {
    return <div className='input-row'>{this.props.children}</div>;
  }
}

export default InputRow;
