import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
