import React from 'react';
import Row from 'react-bootstrap/esm/Row';

type InputRowProps = {
  className?: string;
};

class InputRow extends React.Component<InputRowProps> {
  render() {
    return (
      <Row className={`input-row no-gutters ${this.props.className}`}>
        {this.props.children}
      </Row>
    );
  }
}

export default InputRow;
