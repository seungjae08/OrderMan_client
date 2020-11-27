import React from 'react';
import { Route } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login'
import SignUp from 'pages/SignUp';
import SignUpSocial from 'pages/SignUpSocial';
import Order from 'pages/Order';
import OrderOption from 'pages/OrderOption';
import 'styles/reset.css';
import 'styles/layout.css';
import 'styles/common.css';
import 'styles/App.css';




function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup/social" component={SignUpSocial}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/order/option" component={OrderOption}/>
      <Route path="/order" component={Order}/>
      
    </div>
  );
}

export default App;
