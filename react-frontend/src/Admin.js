import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class Admin extends Component {
 
    constructor(props){
       super(props);
       this.state = {
           posts:[]
       }
       this.delete = this.delete.bind(this);
    }
    componentDidMount(){
       axios.get('http://localhost:6200/cryptos')
       .then(response =>{
           console.log(response)
           this.setState({posts: response.data})
       })
       .catch(error=>{
       console.log(error)
       })
       }

       delete(id){
       axios.delete('http://localhost:6200/cryptos/'+id,{headers : {"auth-token": localStorage.getItem("auth-token")}})
       window.location.replace('/Admin');
    }
   
       render(){
       const { posts}=this.state
       const divStyle = {
        height :'100px',
        
      }
    
       return(
           <div className="wrapper">
               <div className="f-wrapper"> 
                <Nav className="justify-content-end" activeKey="/">
                        <Nav.Item>
                        <Nav.Link href="/Admin">Principal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/AddCrypto">Add Crypto</Nav.Link>
                        </Nav.Item>
                       
                        <Nav.Item>
                        <Nav.Link href="/">Logout</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        
                        </Nav.Item>
                    </Nav>
                    <p></p>
                    <h1>List of Cryptocurrencies </h1>
                    <p></p>
                    <p></p>
                
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            
                            <th>Name</th>
                            <th>Current Price </th>
                            <th>Opening Price</th>
                            <th>Lowest Price of the day</th>
                            <th>Highest Price of the day</th>
                            <th>Image</th>
                            <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                            posts.map(post=> <tr key={post.Id}>
                            
                            <td>{post.Cryptommonaie}</td>
                            <td>{post.Prix}</td>
                            <td>{post["Prix à l'Ouverture"]} </td>
                            <td>{post["Prix le plus bas"]}</td>
                            <td>{post["Prix le plus Haut"]}</td>
                            <td><img src={post.URL}alt="..." style={ divStyle}/></td>
                            <td><Button onClick={this.delete.bind(this, post.Id)} variant="secondary">Delete</Button> </td>
                            </tr>):
                            null
                            }

                            
                        </tbody>
                    </Table>
                </div>
           </div>

       )
       }}
       export default Admin