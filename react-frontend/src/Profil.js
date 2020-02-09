import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

class Profil extends Component {

   constructor(){
        super();
        let response = axios.get('http://localhost:6200/profile',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…YxMn0.r--pvQOp2D63tJI-j6LbMqe0h6tIHIqaAvyjdZUDrWA");
        this.state = {
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          currency: response.data.currency,
          keywords: response.data.keywords,
          cryptocurrencies: response.data.cryptocurrencies
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
    
      handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:6200/profile',this.state)
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
            <form onSubmit={this.handleSubmit}>
              <div className="email">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="password">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" value={this.state.password} onChange={this.handleChange}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
            </form>
          </div>
          </div>
        );
    }
}
 export default Profil;