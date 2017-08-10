// @flow
import React from 'react';
import storeProvider from './storeProvider';

const ShowSeconds = (props: { show: boolean, handler: () => mixed }) => {
  const {show, handler} = props;
  const btnText = `${show ? 'Hide' : 'Show'} Seconds`;
  const btnState_class = `button is-primary${show ? ' is-outlined' : ''}`;

  return (
    <a href="#"
      style={{ outline: 'none' }}
      className={btnState_class}
      onClick={e => {
        e.preventDefault();
        e.currentTarget.blur();
        handler();
      }}>
      {btnText}
    </a>
  );
}

class Timestamp extends React.Component {
  props: Props;
  state: { showSeconds: boolean };

  state = {
    showSeconds: true,
  }

  componentWillUpdate(_nextProps, _nextState) {
    console.log('updating Timestamp');
  }

  _renderTimestamp = (ts: Date) => {
    let tsFmtOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    };

    // Customizations
    if (this.state.showSeconds)
      tsFmtOptions.second = '2-digit';

    return ts.toLocaleDateString('en-us', tsFmtOptions);
  };

  _toggleSeconds = () => {
    this.setState({
      showSeconds: !this.state.showSeconds,
    });
  };

  render() {
    const {clockStarted, timestamp, initialTimestamp} = this.props;

    // Use initialTimestamp, unless the store's clock has started, or this isn't
    // the "initial render" (fresh off the backend)
    const ts = clockStarted ?
      timestamp : (initialTimestamp || timestamp);

    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <ShowSeconds
              show={this.state.showSeconds}
              handler={() => this._toggleSeconds()}
            />
          </div>
          <div className="level-item">
            <p className="tag is-large">
              {this._renderTimestamp(ts)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

type Props = {
  timestamp: Date,
  initialTimestamp: false | Date,
  clockStarted: boolean,
};

function extraProps(store) {
  const {timestamp, clockStarted} = store.getState();
  return {
    timestamp,
    clockStarted,
  };
}

export default storeProvider(extraProps)(Timestamp);
