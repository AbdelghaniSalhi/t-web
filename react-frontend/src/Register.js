import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBInput } from 'mdbreact';
import React, { Component } from 'react';
import './assets/style.css';
import axios from 'axios';
import Google from './Google.js'

class Register extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      currency:''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    options: [
      {
        text: "EUR",
        value: "EUR"
      },
      {
        text: "USD",
        value: "USD"
      },
      {
        text:"NGN",
        value: "NGN"
      },
      {
        text:"GBP",
        value:"GBP"
      }

    ]
  };

  handleChange(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){

    // make API call
    e.preventDefault()
    axios.post('http://localhost:6200/users/register',this.state)
        .then(res =>{
          axios.post('http://localhost:6200/users/login', {email:this.state.email, password:this.state.password})
              .then(response =>{
                localStorage.setItem("auth-token", response.data.token);
                window.location.replace('/ChoixCrypto');
              }).catch(err => {
            alert(err)
          })
        }).catch(error =>{
      alert(error)
    })
  }

  insertData(nonce){
    axios.get('http://wp.ruvictor.com/api/user/register/?username='+this.state.username+'&email='+this.state.email+'&password='+this.state.password)
        .then(res => {
        }).catch(error => {
      console.log(error.response)
    });
  }

  getWPnonce(){
    axios.get('http://wp.ruvictor.com/api/get_nonce/?controller=user&method=register')
        .then(res => {
          this.insertData(res.data.nonce);
        }).catch(error => {
      console.log(error.response)
    });
  }

  render(){
    console.log(this.state)
    return (
        <div className="wrapper">
          <div className="form-wrapper" style={{height:'80%'}}>



            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <form onSubmit={this.handleSubmit}>
                    <p className="h5 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                      <MDBInput label="Name"  name="username" value={this.state.username} onChange={this.handleChange} htmlFor="exampleInputEmail1" icon="user" group type="text"
                                success="right" style={{width: '180%'}} />

                      <MDBInput label="Email" icon="envelope" name="email" value={this.state.email} onChange={this.handleChange} group type="email"
                                success="right" style={{width: '180%'}} />



                      <MDBInput label="Password" name="password" value={this.state.password} onChange={this.handleChange} icon="lock" group type="password" style={{width: '180%'}}  />

                      <MDBInput label="Confirm Password" name="display_name2" id="exampleInputPassword2" onChange={this.handleConfirmPassword} icon="lock"  type="password" style={{width: '180%',position:'relative',top:'20px'}}  />

                      <div>
                        <select className="browser-default custom-select" name="currency" value={this.state.currency} onChange={this.handleChange}
                                style={{width: '180%',position:'relative',top:'20px'}}>
                          <option>Choose your Devise</option>
                          <option value="EUR">EUR</option>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="JPY">JPY</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-center" style={{width: '180%',position:'relative',top:'53px'}}>
                      <MDBBtn type="submit" color="primary" >Submit</MDBBtn>
                    </div>
                    <p>INSCRIVEZ-VOUS AVEC...</p>
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
export default Register;