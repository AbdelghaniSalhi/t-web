import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import Nav from 'react-bootstrap/Nav';

class PrincipalOff extends Component {
 
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

       
       
        width: '400px',
        height :'100px',
      
        
      }
       return(
           <div className="wrapper">
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
                <h1>List of Crypto-monnais : </h1>
                <p></p>
                <p></p>
                <CardColumns>
                {
                    posts.length ?
                   
                    posts.map(post=><Card key={post.id}  className="p-3">
                        <Card.Img variant="top"  style={ divStyle}  src= {post.logo_url}/>
                        <Card.Body>
                        <Card.Title>{post.name}</Card.Title>
                        <Card.Text>
                           <p> Current Price : {post.price}</p>
                           <p> Opening Price : </p>
                           <p> Lowest Price of the day :</p>
                           <p> Highest Price of the day : </p>
                        </Card.Text>
                        </Card.Body>
                        
                    </Card>):
                        null
                        }
                        
                </CardColumns>
                </div>
           </div>

       )
       }}
       export default PrincipalOff