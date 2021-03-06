import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';

let emailU = '';
let passwordU = '';

class Profil extends Component {

    constructor(props){
        super(props);

        this.state = {
            
            currency: '',
            password: '',
            username: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this);
     }

     componentDidMount(){
        axios.get('http://localhost:6200/users/profile',{headers : {"auth-token": localStorage.getItem("auth-token")}})
        .then(response =>{
            console.log(response.data.user)
            this.setState({
                currency:response.data.user.currency,
                password: '',
                username: response.data.user.username,
            })
            emailU = response.data.user.email;
            passwordU = response.data.user.password;
          })
        .catch(error=>{
          alert("Erreur lors de la modification")
        })
        }

     handleChange(e){
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });
      }

      retourPrincipale(e){
        e.preventDefault();
        window.location.replace("/PrinOn");
      }

    
     handleSubmit(e){
        e.preventDefault()
       // console.log(this.state)
        axios.put('http://localhost:6200/users/profile',this.state,{headers : {"auth-token": localStorage.getItem("auth-token")}})
        .then(response=>{
          alert("Profil Modifié!");
          axios.post('http://localhost:6200/users/relogin', {email: emailU, password: passwordU})
          .then(response =>{
            localStorage.setItem("auth-token", response.data.token);
            window.location.reload();
          })
        }).catch(error => {
          alert("Erreur lors de la modification");
        })
      }
     

        insertData(nonce){
            axios.get('http://wp.ruvictor.com/api/user/register/?username='+this.state.username+'&email='+this.state.email+'&password='+this.state.password)
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
                <h1><b>Modifier profile</b></h1>
              <form onSubmit={this.handleSubmit}>
             <div className="username">
             <label htmlFor="exampleInputUsername">Username</label>
             <input name="username" style={{width: '202%'}} value={this.state.username} onChange={this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
             </div>
            
          <div className="password">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" style={{width: '100%'}} value={this.state.password} onChange={this.handleChange}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

            <div>
                <label htmlFor="exampleInputUsername">Devise</label>
                  <select className="browser-default custom-select" name="currency" value={this.state.currency} onChange={this.handleChange}
                          style={{width: '130%',position:'relative',top:'10px'}}>
                      <option>Choose your Devise</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                  </select>
            </div>

            
           
             <div className="editerProfile" style={{width: '41%',position:'relative',left:'5%',top:'20px'}}>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div className="retour" style={{width: '41%',position:'relative',left:'10%',top:'20px'}}>
            <button type="retour" className="btn btn-primary" onClick={this.retourPrincipale}>Retour</button>
          </div>
           
             

             </form>
            </div>
            </div>
            
          );
      }
}

export default Profil