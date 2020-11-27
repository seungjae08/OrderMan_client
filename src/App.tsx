import React from 'react';
import { Route } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login'
import 'styles/layout.css';
import 'styles/common.css';
import 'styles/App.css';


function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
    </div>
  );
}

export default App;
