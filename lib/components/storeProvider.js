// @flow weak
import * as React from 'react';
import PropTypes from 'prop-types';

import type { Store } from 'components/App';

type $extraProps = (store: Store, originalProps: * ) => *;

/**
 * Wrapper HOC.
 *
 * Retrieves our Store (StateApi) from the App context,
 * and provides it to the `WrappedComponent` as a prop.
 */
const storeProvider = (extraProps: $extraProps = () => ({})) => (WrappedComponent: * ) => {
  return class extends React.PureComponent<*, $extraProps> {
    static displayName = `${WrappedComponent.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };
    context: {
      store: Store
    };
    subscriptionId: number;

    usedState: () => $extraProps = () =>
      extraProps(this.context.store, this.props);

    state = this.usedState();

    onStoreChange = () => {
      // Guard against updating unmounted components.
      if (this.subscriptionId) {
        // $FlowFixMe
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
      const { store } = this.context;
      return ( <
        WrappedComponent { ...this.props
        } { ...extraProps(store, this.props)
        }
        store = {
          store
        }
        />
      );
    }
  }
};

export default storeProvider;
