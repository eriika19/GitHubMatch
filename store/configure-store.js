import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

function configureStore(preloadedState, { isServer, req = null }) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
}

/* const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  // add route middleware
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    // development use logger
    // const { logger } = require('redux-logger');
    // middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configureStore = (preloadedState, { isServer, req = null }) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  if (req || !isServer) {
    store.runSagaTask();
  }

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require("./reducers").default)
    );
  }

  return store;
}; */

export default configureStore;
