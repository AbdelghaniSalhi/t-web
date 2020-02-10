
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
      password: '',
      currency:''
      
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
          <div className="form-wrapper">
            <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="username">
          <label htmlFor="exampleInputEmail1">Nom d'utilisateur</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Votre Nom" />
          </div>
          <div className="email">
          <label htmlFor="exampleInputEmail1">Adresse Mail</label>
          <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse email" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword1">Mot de Passe</label>
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange}  className="form-control" id="exampleInputPassword1" placeholder="Mot De passe" />
          </div>
          <div className="password">
          <label htmlFor="exampleInputPassword2">Confirmer Mot de passe</label>
          <input name="display_name2" type="password" onChange={this.handleConfirmPassword}  className="form-control" id="exampleInputPassword2" placeholder="Mot de passe" />
          </div>
         
          <div className="currency">
          <label htmlFor="exampleInputEmail1">Devise</label>
          <input name="currency" value={this.state.currency} onChange={this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Devise" />
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
export default Register;