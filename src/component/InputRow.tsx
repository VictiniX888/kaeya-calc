import React from 'react';
import Row from 'react-bootstrap/esm/Row';

class InputRow extends React.Component {
  render() {
    return <Row className='input-row no-gutters'>{this.props.children}</Row>;
  }
}

export default InputRow;
