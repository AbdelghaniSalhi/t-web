import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

class Profil extends Component {
 
    constructor(props){
       super(props);
       this.state = {
           posts:[]
       }
    }
    componentDidMount(){
       axios.get('http://localhost:6200/profile')
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
                        <Nav.Link href="/Profil">Principal</Nav.Link>
                        </Nav.Item>

                </Nav>
                
               <Table striped bordered hover size="sm">

                    <thead>
                        <ul>
                        <li>username</li>
                        <li>email </li>
                        <li>password</li>
                        <li>currency</li>
                        <li>cryptoCurrencies</li>
                            <tr>
                            <th>Username</th>
                            <th>Current Price </th>
                            <th>Opening Price</th>
                            <th>Lowest Price of the day</th>
                            <th>Highest Price of the day</th>
                            <th>Url of Image</th>
                            </tr>
                        </ul>
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
       export default Profil


        /* username
               email
               password
               currency
            cryptoCurrencies */