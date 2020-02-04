
import Facebook from './components/Facebook';

import React, { Component } from 'react';
import './assets/style.css';
import axios from 'axios';

class Register extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    username: '',
    email: '',
    password: '',
  }

  handleChange(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    if (this.state.password !== this.state.ConfirmPassword) {
    alert("Passwords don't match");
    } else {
    // make API call
    e.preventDefault();
    this.getWPnonce();
    }
    
    }

  insertData(nonce){
    axios.get('http://wp.ruvictor.com/api/user/register/?username='+this.state.username+'&email='+this.state.email+'&nonce=' + nonce + '&display_name='+this.state.display_name+'&insecure=cool')
    .then(res => {
      ///const data = res.data;
      ///console.log(data);
    }).catch(error => {
      console.log(error.response)
  });
  }

  getWPnonce(){
    axios.get('http://wp.ruvictor.com/api/get_nonce/?controller=user&method=register')
    .then(res => {
      this.insertData(res.data.nonce);
      ///console.log(res.data.nonce);
    }).catch(error => {
      console.log(error.response)
  });
  }

  render(){
    return (
      <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="username">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
          </div>
          <div className="email">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="display_name" type="password" value={this.state.password} onChange={this.handleChange}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword2">Confirm your password</label>
          <input name="display_name" type="password" onChange={this.handleConfirmPassword}  className="form-control" id="exampleInputPassword2" placeholder="Password" />
          </div>
          <div className="createAccount">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        <Facebook/>
      </div>
      </div>
      
    );
  }
}
