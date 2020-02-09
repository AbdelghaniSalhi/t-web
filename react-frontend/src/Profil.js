import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';



class Profil extends Component {

  constructor(props){
    super(props);
    axios.get('http://localhost:6200/users/profile',{headers : localStorage.getItem("auth-token")})
    .then(response=>{
      this.state = {
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        currency: response.data.currency,
        keywords: response.data.keywords,
        cryptocurrencies: response.data.cryptocurrencies
      }
      console.log(this.state)
       })
    .catch(error =>{
      console.log(error)
    })
  
  }


  componentDidMount(){
    axios.get('http://localhost:6200/users/profile',{headers : localStorage.getItem("auth-token")})
    .then(response=>{
      this.setState({posts: response.data})
      console.log(response.data)
       })
    .catch(error =>{
      console.log(error)
    })
  
    
    
    }

  render(){
    
    return (
      <div className="username">
          value={this.state.username}
          </div>
      )
      }
     }


export default Profil;