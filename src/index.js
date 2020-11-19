import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import store, {  rrfProps } from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(

    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
   
 ,
  document.getElementById('root')
);

