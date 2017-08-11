// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type {Store} from 'components/App';

/**
 * Wrapper HOC. Retrieves our Store (StateApi) from the App context,
 * and provides it to the `WrappedComponent` as a prop.
 *
 */
const storeProvider = (extraProps: $extraProps = () => ({})) => (WrappedComponent: ReactClass<*>) => {
  return class extends React.PureComponent {
    static displayName = `${WrappedComponent.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };
    context: { store: Store };
    subscriptionId: number;

    usedState = () => {
      return extraProps(this.context.store, this.props);
    };

    state = this.usedState();

    onStoreChange = () => {
      // Guard against updating unmounted components.
      if (this.subscriptionId) {
        this.setState(this.usedState());
      }
    };

    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
      // $FlowFixMe
      this.subscriptionId = null;
    }

    render() {
      const {store} = this.context;
      return (
        <WrappedComponent
          {...this.props}
          {...extraProps(store, this.props)}
          store={store}
        />
      );
    }
  }
};

type $extraProps = (store: Store, originalProps: *) => *;

export default storeProvider;
