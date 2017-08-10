// @flow
import React from 'react';
import storeProvider from './storeProvider';

class Timestamp extends React.Component {
  props: Props;

  render() {
    const {timestamp, initialTimestamp} = this.props;
    const ts = initialTimestamp || timestamp;

    const tsOptions = {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
      hour12: false, hour: '2-digit', minute: '2-digit', second: 'numeric',
    };

    return (
      <div className="container">
        <span className="subtitle is-medium">
          {ts.toLocaleDateString('en-us', tsOptions)}
        </span>
      </div>
    );
  }
}

type Props = {
  timestamp: Date,
  initialTimestamp: false | Date,
};

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp,
  };
}

export default storeProvider(extraProps)(Timestamp);
