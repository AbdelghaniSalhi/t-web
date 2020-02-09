import React, { Component } from 'react';
import './assets/style.css';
import axios from 'axios';

class AddCrypto extends Component {

  constructor(){
    super();
    this.state = {
      symbol: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    symbol: '',
    name: '',
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
    console.log(this.state)
    axios.post('http://localhost:6200/cryptos',this.state,{headers : {"auth-token": localStorage.getItem("auth-token")}})
    .then(response=>{
      console.log(response)
      window.location.replace('/Admin');
    })
    .catch(error =>{
      console.log(error)
    })
  

    
    }
    render(){
        return (
          <div className="wrapper">
              <div className="form-wrapper">
                <h1>Add Cryptos</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="symbol">
              <label htmlFor="exampleInputEmail1">Symbol</label>
              <input name="symbol" value={this.state.username} onChange={this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter symbol" />
              </div>
              <div className="name">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input name="name" value={this.state.name} onChange={this.handleChange} type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name " />
              </div>
              
              <div className="createAccount">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
           
          </div>
          </div>
          
        );
      }
    }
    export default AddCrypto;