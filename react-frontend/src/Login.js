import React, { useState } from "react";
import "./assets/style.css";

class Login extends Component {

  constructor(){
    super();
    this.state = {
      
      email: '',
      password: ''
    };
    
  }
  state = {
    
    email: '',
    password: '',
  }

  validateForm() {
    return email.length > 0 && password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    axios.post('http://localhost:6200/users/login',this.state)
    .then(response=>{
    console.log(response)
    })
    .catch(error =>{
    console.log(error)
    })
    }
  render(){
  return (
    <div className="wrapper">
    <div className="form-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="display_name" type="password" value={password} onChange={e => setPassword(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="createAccount">
            <button type="submit" disabled={!validateForm()} className="btn btn-primary">Submit</button>
          </div>
      </form>
    </div>
    </div>
  );
}}
export default Login;