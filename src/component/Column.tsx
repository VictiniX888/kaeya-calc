import React from 'react';

type ColumnProps = {
  className?: string;
};

class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <div className={`column ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;
