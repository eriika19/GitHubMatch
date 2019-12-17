import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

// 1: Create the middleware

// const sagaMiddleware = createSagaMiddleware();

/* const bindMiddleware = middleware => {
  // add route middleware
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");

    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}; */



const configureStore = (preloadedState, { isServer, req = null }) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  // Before we returned the created store without assigning it to a variable:
  // return createStore(reducer, preloadedState);
  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass
   * `INITIAL_STATE` when creating the store.
   */

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */
  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }
  // 4: now return the store:
  return store;
};

export default configureStore;
