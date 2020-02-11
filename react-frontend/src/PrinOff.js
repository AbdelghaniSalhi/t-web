import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class PrinOff extends Component {
 
    constructor(props){
       super(props);
       this.state = {
           posts:[],
           p:[]
        
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
       
      
        axios.get('http://localhost:6200/Articles')
        .then(response =>{
            console.log(response)
            this.setState({p: response.data})
        })
        .catch(error=>{
        console.log(error)
        })
    }
       
       render(){
       const { posts}=this.state
       const { p}=this.state
       const divStyle = {
       
        height :'100px',
      }
       return(
           <div className="www">
               <div className="f-wrapper"> 
                <Nav className="justify-content-end" activeKey="/">
                        <Nav.Item>
                        <Nav.Link href="/">Principal</Nav.Link>
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
                            </tr>):
                            null
                            }

                            
                        </tbody>
                    </Table>
                    <p></p>
                    <h1>List of Articles </h1>
                    <p></p>
                    <p></p>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Url </th>
                            <th>Image</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        p.length ?
                    
                            p.map(po=> <tr key={po.id}>
                            <td>{po.titre}</td>
                            <td>{po.url}</td>
                            <td><img src={po.image}alt="..." style={ divStyle}/></td>
                            <td><Button variant="secondary" href={'/ArticleOff/' + po.id} >+</Button></td>
                            
                            </tr>):
                            null
                            }

                            
                        </tbody>
                    </Table>
                </div>
           </div>

       )
       }}
       export default PrinOff