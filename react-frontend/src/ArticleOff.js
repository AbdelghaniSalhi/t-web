import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';

import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
let article=[]
let monnaies=[]
class PrinOff extends Component {
 
    constructor(props){
       super(props);
       this.state = {
          
           p:[]
        
       }
    }
    componentDidMount(){
        axios.get('http://localhost:6200/Articles')
        .then(response =>{
            console.log(response)
            article = response.data.find(elem => elem.id === this.props.match.params.id)
            this.setState({p:  article})
            for (let i =0; i<article.coins.length; i++){
                monnaies.push(article.coins[i].name);
            }
            console.log(monnaies)

        })
        .catch(error=>{
        console.log(error)
        })
    }
       
       render(){
        const divStyle = {
            position: 'relative',
            left : '40%',
            width: '200px',
            height :'200px',
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
                    
                    <p></p>
                    <p></p>
                   
                    <Card >
                        <Card.Img variant="top" src={article.image} style={ divStyle}/>
                        <Card.Body>
                            <Card.Title>Title</Card.Title>
                            <Card.Text>
                                 {article.titre}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Summary :</Card.Title>
                            <Card.Text>
                                 {article.summary}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Url:</Card.Title>
                            <Card.Text>
                                 {article.url}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Date:</Card.Title>
                            <Card.Text>
                                 {article.date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                  
                   
                    
                    
         
   

                </div>
           </div>

       )
       }}
       export default PrinOff