// @flow
import React from 'react';

class Timestamp extends React.Component {
  props: Props;

  render() {
    const {timestamp} = this.props;
    return (
      <div className="container">
        <span className="subtitle is-medium">
          {timestamp.toString()}
        </span>
      </div>
    );
  }
}

type Props = {
  timestamp: Date,
};

export default Timestamp;
