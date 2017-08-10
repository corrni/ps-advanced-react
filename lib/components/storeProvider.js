// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type {Store} from 'components/App';

/**
 * Wrapper HOC. Retrieves our Store (StateApi) from the App context,
 * and provides it to the `WrappedComponent` as a prop.
 *
 * TODO: description and flowtype refinements to "extraProps"
 */
const storeProvider = (extraProps: (store: Store, originalProps: *) => *) => (WrappedComponent: ReactClass<*>) => {
  return class extends React.PureComponent {
    static displayName = `${WrappedComponent.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };

    context: {store: Store};
    subscriptionId: number;

    onStoreChange = () => {
      this.forceUpdate();
    };

    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
    }

    render() {
      const {store} = this.context;
      return <WrappedComponent
        {...this.props}
        {...extraProps(store, this.props)}
        store={store} />;
    }
  }
};

export default storeProvider;
