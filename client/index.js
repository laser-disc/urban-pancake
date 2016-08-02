import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/style.css';
import 'babel-polyfill';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/app';
import rootReducer from './reducers/reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default class Index extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Index />, document.querySelector('#app'));

// The entry point of our app must accept hot reloading in dev environment
if (module.hot) {
  module.hot.accept();
}
