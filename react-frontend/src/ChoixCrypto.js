import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
let arr=[];
class ChoixCrypto extends Component {

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
           console.log(response)
           this.setState({posts: response.data})
       })
       .catch(error=>{
       console.log(error)
       })
       }

    add(id){
        if ( !arr.includes(id)){
        arr.push(id);
        }
        console.log(arr)
 
    }
    submit(event){
        event.preventDefault()
        console.log(arr)
        axios.put('http://localhost:6200/users/profile', {cryptoCurrencies:arr} ,{headers : {"auth-token": localStorage.getItem("auth-token")}})
        .then(response => {
            alert("ajouté");
            window.location.replace('/PrinOn');
    
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
                                <th>Name</th>
                                <th>Symbol</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                            posts.map(post=> <tr key={post.symbole}>
                            <td>{post.nom}</td>
                            <td>{post.symbole}</td>
                            <td><Button onClick={this.add.bind(this, post.symbole)} variant="secondary">Add</Button> </td>
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
       export default ChoixCrypto