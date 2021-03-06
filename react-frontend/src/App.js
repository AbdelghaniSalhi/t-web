import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login  from '../src/Login';
import  Register from '../src/Register';


import PrinOn from './PrinOn';
import CryptoPeriodD from './CryptoPeriodD';
import CryptoPeriodM from './CryptoPeriodM';
import CryptoPeriodH from './CryptoPeriodH';
import PrinOff from './PrinOff';
import Admin from './Admin';
import AddCrypto from './AddCrypto';
import ChoixCrypto from './ChoixCrypto';

import DeleteCrypto from './DeleteCrypto';
import AjouterCrypto from './AjouterCrypto';
import Profil from './Profil';
import ArticleOff from './ArticleOff';
import ArticleOn from './ArticleOn';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
         
            <Switch>
            <Route exact path="/" component={PrinOff} />
             
              <Route  path="/PrinOn" component={PrinOn} />
              <Route path="/Register" component={Register} />
              <Route  path="/CryptoPeriodD/:Id" component={CryptoPeriodD} />
              <Route  path="/CryptoPeriodH/:Id" component={CryptoPeriodH} />
              <Route  path="/CryptoPeriodM/:Id" component={CryptoPeriodM} />

              <Route path="/Login" component={Login} />
              <Route path="/Admin" component={Admin} />
              <Route path="/AddCrypto" component={AddCrypto} />
              <Route path="/ChoixCrypto" component={ChoixCrypto} />
              <Route path="/DeleteCrypto" component={DeleteCrypto} />
              <Route path="/AjouterCrypto" component={AjouterCrypto} />
              <Route  path="/ArticleOff/:id" component={ArticleOff} />
              <Route  path="/ArticleOn/:id" component={ArticleOn} />
              


              <Route path="/Profil" component={Profil} />
            </Switch>
         
        </Router>
      </React.Fragment>
    );
  }
}

export default App;