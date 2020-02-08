import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login  from '../src/Login';
import  Register from '../src/Register';
import PrincipalOff2 from './PrincipalOff2';

import PrinOn from './PrinOn';
import PrinOff from './PrinOff';
import Admin from './Admin';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
         
            <Switch>
            <Route exact path="/" component={PrinOff} />
              <Route  path="/PrincipalOff2" component={PrincipalOff2} />
              <Route  path="/PrinOn" component={PrinOn} />
              <Route path="/Register" component={Register} />
              <Route path="/Login" component={Login} />
              <Route path="/Admin" component={Admin} />
            </Switch>
         
        </Router>
      </React.Fragment>
    );
  }
}

export default App;