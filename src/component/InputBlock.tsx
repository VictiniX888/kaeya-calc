import React from 'react';
import Row from 'react-bootstrap/esm/Row';

class InputBlock extends React.Component {
  render() {
    return <Row className='input-block no-gutters'>{this.props.children}</Row>;
  }
}

export default InputBlock;
