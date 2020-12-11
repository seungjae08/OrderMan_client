import React from 'react';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login'
import SignUp  from 'pages/SignUp';
import UnSignInOrder from 'pages/UnSignInOrder';
import Order from 'pages/Order';
import OauthSignup from 'pages/OauthSignup';
import MyPage from 'pages/MyPage';
import 'styles/reset.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'styles/layout.css';
import 'styles/common.css';
import 'styles/App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup/social" component={OauthSignup}/>
      <Route path="/signup" exact component={SignUp}/>
      <Route path="/order/unsignin" component={UnSignInOrder}/>
      <Route path="/order" exact component={Order}/>
      <Route path="/mypage" exact component={MyPage}/>
    </div>
  );
}

export default App;
