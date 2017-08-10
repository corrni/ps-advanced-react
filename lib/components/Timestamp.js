// @flow
import React from 'react';
import storeProvider from './storeProvider';

class Timestamp extends React.Component {
  props: Props;

  render() {
    const {clockStarted, timestamp, initialTimestamp} = this.props;

    const tsOptions = {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
      hour12: false, hour: '2-digit', minute: '2-digit', second: 'numeric',
    };

    // Use initialTimestamp, unless the store's clock has started, or this isn't
    // the "initial render" (fresh off the backend)
    const ts = clockStarted ?
      timestamp : (initialTimestamp || timestamp);

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
  const {timestamp, clockStarted} = store.getState();
  return {
    timestamp,
    clockStarted,
  };
}

export default storeProvider(extraProps)(Timestamp);
