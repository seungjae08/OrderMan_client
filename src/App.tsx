import React from 'react';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import Main from 'pages/Main';
import 'styles/layout.css';
import 'styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
