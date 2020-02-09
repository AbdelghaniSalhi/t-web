import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
class CryptoPeriodH extends Component {
 
    constructor(props){
       super(props);
     
       this.state = {
        posts:[]
    }
    }
    componentDidMount(){
        
       axios.get('http://localhost:6200/cryptos/symbol/'+this.props.match.params.Id+'/period/Heures',{headers : {"auth-token": localStorage.getItem("auth-token")}})
       .then(response =>{
           
           console.log(response)
           this.setState({posts: response.data})
          console.log( this.setState({posts: response.data}))
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
                        <Nav.Link href="/PrinOn">Principal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/Login">Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="/">Logout</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        
                        </Nav.Item>
                    </Nav>
                    <p></p>
                    <h1> {this.props.match.params.Id}</h1>   
                    <p></p>
                    <p></p>
                
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            
                            <th>Day</th>
                            <th>Current Price </th>
                            <th>Opening Price</th>
                            <th>Lowest Price of the day</th>
                            <th>Highest Price of the day</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                            posts.map(post=> <tr key={post.Date}>
                            
                            <td>{post.Date}</td>
                            <td>{post.Prix}</td>
                            <td>{post["Prix à l'Ouverture"]} </td>
                            <td>{post["Prix le plus bas"]}</td>
                            <td>{post["Prix le plus Haut"]}</td>
                            
                            
                            
                            </tr>):
                            null
                            }

                            
                        </tbody>
                    </Table>
                </div>
           </div>

       )
       }}
       export default CryptoPeriodH