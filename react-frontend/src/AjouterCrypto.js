import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

let arr=[];
let base=[]
let aEnvoyer=[];
let utilisateur = [];

class AjouterCrypto extends Component {

    constructor(props){
       super(props);
       this.state = {
           posts:[]
       };
      
       this.add = this.add.bind(this);
    }
    state ={
        posts:[]
    }

    componentDidMount(){
       axios.get('http://localhost:6200/cryptos/liste')
       .then(response =>{
            for(let i = 0; i<response.data.length; i++){
                base.push(response.data[i].symbole) 
            }
            axios.get('http://localhost:6200/users/profile',{headers : {"auth-token": localStorage.getItem("auth-token")}})
            .then(response => {
                for (let j =0 ; j< response.data.user.cryptoCurrencies.length; j++){
                    utilisateur.push(response.data.user.cryptoCurrencies[j]);
                }
                for(let i = 0; i<base.length; i++){   
                    if (!response.data.user.cryptoCurrencies.includes(base[i])){
                        arr.push(base[i])
                    }
                }
                this.setState({posts: arr})
            }).catch(err => {
                alert(err);
            })
        }).catch(error=>{
            console.log(error)
        })
       }

    add(id){
        if ( !aEnvoyer.includes(id)){
            aEnvoyer.push(id);
        }
        console.log(arr)
 
    }
    submit(event){
        event.preventDefault()
        for (let i =0; i<utilisateur.length; i++){
            aEnvoyer.push(utilisateur[i]);
        }
        console.log(aEnvoyer);
        axios.put('http://localhost:6200/users/profile', {cryptoCurrencies:aEnvoyer} ,{headers : {"auth-token": localStorage.getItem("auth-token")}})
        .then(response => {
            alert("Ajouté");
            //console.log(localStorage.getItem("auth-token"))
            window.location.replace('/Login');
    
        }).catch(err => {
            alert(err)
        })
        //window.location.replace('/PrinOn');
    }
       render(){
       const { posts}=this.state
       return(
           <div className="wrapper">
               <div className="f-wrapper"> 
               <form onSubmit={this.submit}>
                    <p></p>
                    <h1>List of Cryptocurrencies </h1>
                    <p></p>
                    <p></p>
                
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                
                                <th>Symbol</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                        posts.map(post=> <tr key={post.symbole}>
                            
                            <td>{post}</td>
                            <td><Button onClick={this.add.bind(this, post)} variant="secondary">Add</Button> </td>
                            </tr>):
                            null
                            }   
                        </tbody>
                    </Table>
                   
                    <div className="createAccount">
            <button type="submit"  className="btn btn-primary" >Submit</button>
          </div>
                    </form>
                </div>
           </div>

       )
       }}
       export default AjouterCrypto