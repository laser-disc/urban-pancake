import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers';
import {Link} from "react-router";
import Router from '../components/Router.jsx';
window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],  t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s); js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = []; t.ready = function(f) {
        t._e.push(f);
      };
      return t;
    }(document, "script", "twitter-wjs"));

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <Router />
    </Provider>
  );
}

ReactDOM.render(
  <App/>
  , document.querySelector('#app'));
export default App;
