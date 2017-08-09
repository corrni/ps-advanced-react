// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type {Store} from 'components/App';

/**
 * Wrapper HOC. Retrieves our Store (StateApi) from the App context,
 * and provides it to the `WrappedComponent` as a prop.
 *
 * @param {*} WrappedComponent Component which needs access to `store`.
 */
const storeProvider = (WrappedComponent: ReactClass<*>) => {
  return class extends React.Component {
    static displayName = `${WrappedComponent.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };

    context: {store: Store};

    render() {
      const {store} = this.context;
      return <WrappedComponent {...this.props} store={store} />;
    }
  }
};

export default storeProvider;
