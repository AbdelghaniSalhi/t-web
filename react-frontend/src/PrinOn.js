import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
class PrinOn extends Component {
 
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
       const divStyle = {
       
        height :'100px',
      }
       return(
           <div className="wrapper">
               <div className="f-wrapper"> 
                <Nav className="justify-content-end" activeKey="/">
                        <Nav.Item>
                        <Nav.Link href="/PrincipalOff2">Principal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/Login">Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/Register">Logout</Nav.Link>
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
                            <th>Period</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                            posts.map(post=> <tr key={post.id}>
                            
                            <td>{post.Cryptommonaie}</td>
                            <td>{post.Prix}</td>
                            <td>{post["Prix à l'Ouverture"]} </td>
                            <td>{post["Prix le plus bas"]}</td>
                            <td>{post["Prix le plus Haut"]}</td>
                            <td><img src={post.URL}alt="..." style={ divStyle}/></td>
                            <td>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary">daily</Button>
                                <Button variant="secondary">hourly</Button>
                                <Button variant="secondary">minute</Button>
                            </ButtonGroup>
                             </td>
                            </tr>):
                            null
                            }

                            
                        </tbody>
                    </Table>
                </div>
           </div>

       )
       }}
       export default PrinOn