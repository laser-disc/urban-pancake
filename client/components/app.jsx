import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers';
import {Link} from "react-router";
import Router from '../components/Router.jsx';
import ReduxModal from 'react-redux-modal'

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <div>
        <Router />
        <ReduxModal />
      </div>
    </Provider>
  );
}

ReactDOM.render(
  <App/>
  , document.querySelector('#app'));
export default App;