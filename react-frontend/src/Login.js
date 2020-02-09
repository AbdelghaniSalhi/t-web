import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';

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
      localStorage.setItem("status", JSON.stringify( response.status));
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
    <div className="wrapper">
    <div className="form-wrapper">
      <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="email">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="createAccount">
            <button type="submit"  className="btn btn-primary" >Submit</button>
          </div>
      </form>
    </div>
    </div>
  );
}
  }

export default Login;