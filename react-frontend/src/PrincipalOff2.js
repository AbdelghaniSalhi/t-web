import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

class PrincipalOff2 extends Component {
 
    constructor(props){
       super(props);
       this.state = {
           posts:[]
       }
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
       render(){
       const { posts}=this.state
       return(
           <div className="wrapper">
               <div className="f-wrapper"> 
                <Nav className="justify-content-end" activeKey="/">
                        <Nav.Item>
                        <Nav.Link href="/PrincipalOff2">Principal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/Login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/Register">Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        
                        </Nav.Item>
                    </Nav>
                
               <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Current Price </th>
                        <th>Opening Price</th>
                        <th>Lowest Price of the day</th>
                        <th>Highest Price of the day</th>
                        <th>Url of Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    posts.length ?
                   
                        posts.map(post=> <tr key={post.id}>
                        <td></td>
                        <td>{post.name}</td>
                        <td>{post.price}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{post.logo_url}</td>
                        </tr>):
                        null
                        }

                        
                    </tbody>
                </Table>
                </div>
           </div>

       )
       }}
       export default PrincipalOff2