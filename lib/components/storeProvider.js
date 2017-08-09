// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type {Store} from 'components/App';

/**
 * Wrapper HOC. Retrieves our Store (StateApi) from the App context,
 * and provides it to the wrapped `Component` as a prop.
 *
 * @param {React.Component} WrappedComponent
 */
const storeProvider = (WrappedComponent: ReactClass<*>) => {
  const WithStore = (props: *, context: {store: Store}) =>
    <WrappedComponent {...props} store={context.store} />;

  WithStore.contextTypes = {
    store: PropTypes.object,
  };

  return WithStore;
};

export default storeProvider;
