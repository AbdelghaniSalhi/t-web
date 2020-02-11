import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import Google from './Google.js'


class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:6200/users/login',this.state)

    .then (response => {
      //localStorage.setItem("status", JSON.stringify( response.status));
      localStorage.setItem("auth-token", response.data.token);
      if (response.data.role === "Administrateur") {
      window.location.replace('/Admin');
      }else {
        window.location.replace('/PrinOn')
      }
    }).catch(error => {
      alert("Email ou mot de passe incorrect");
    })
  }

  render(){
  return (
      <div className="wrapper" >
        <div className="form-wrapper" style={{height:'60%'}}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form onSubmit={this.handleSubmit}>
                  <p className="h5 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput label="Email" name="email" value={this.state.email} onChange={this.handleChange} icon="envelope" group type="email" validate error="wrong"
                              success="right" style={{width: '180%'}} />
                    <MDBInput label="Password" value={this.state.password} onChange={this.handleChange} icon="lock" group type="password" validate style={{width: '180%'}}/>
                  </div>
                  <div className="text-center" style={{width: '180%',position:'absolute',top:'210px',left:'15px'}}>
                    <MDBBtn>Login</MDBBtn>
                  </div>
                  <p style={{width: '180%',position:'relative',top:'43px',left:'130px'}}><b>Ou</b> </p>
                  <p style={{width: '180%',position:'relative',top:'43px'}}><b>CONNECTEZ-VOUS AVEC</b>...</p>
                  <Google />
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
  );
}
  }

export default Login;