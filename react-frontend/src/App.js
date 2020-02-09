import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login  from '../src/Login';
import  Register from '../src/Register';
import PrincipalOff2 from './PrincipalOff2';
import PrincipalOff from './PrincipalOff';
import Profil from './Profil';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
         
            <Switch>
            <Route exact path="/" component={PrincipalOff} />
              <Route  path="/PrincipalOff2" component={PrincipalOff2} />
              <Route path="/Register" component={Register} />
              <Route path="/Login" component={Login} />
              <Route path="/Profil" component={Profil} />

              
            </Switch>
         
        </Router>
      </React.Fragment>
    );
  }
}

export default App;