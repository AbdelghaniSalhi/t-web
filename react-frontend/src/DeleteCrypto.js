import React, { Component } from "react";
import "./assets/style.css";
import axios from 'axios';
import {Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


let arr=[];
let toDelete=[]
let aEnvoyer=[];

let emailU = "";
let passwordU = "";

class DeleteCrypto extends Component {

    constructor(props){
       super(props);
       this.state = {
           posts:[]
       };
       this.handleChange = this.handleChange.bind(this);
       this.delete = this.delete.bind(this);
    }
    state ={
        posts:[]
    }

    retourPrincipale(e){
        e.preventDefault();
        window.location.replace("/PrinOn");
    }

    componentDidMount(){
       axios.get('http://localhost:6200/users/profile',{headers : {"auth-token": localStorage.getItem("auth-token")}})
       .then(response =>{
           this.setState({posts: response.data.user.cryptoCurrencies});
           arr=response.data.user.cryptoCurrencies;
            emailU = response.data.user.email;
            passwordU = response.data.user.password;
       })
       .catch(error=>{
       console.log(error)
       })
       }

    delete(id){
        if ( !toDelete.includes(id)){
            toDelete.push(id);
        }
        console.log(toDelete)
 
    }
    handleChange(e){
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });
      }
    submit(event){
        event.preventDefault()
        
        for(let i = 0; i<arr.length; i++){
            if ( !toDelete.includes(arr[i])){
                aEnvoyer.push(arr[i])
            }
        }
        console.log(aEnvoyer);
        axios.put('http://localhost:6200/users/profile', {cryptoCurrencies:aEnvoyer} ,{headers : {"auth-token": localStorage.getItem("auth-token")}})
        .then(response => {
            alert("Supprimé !");
            axios.post('http://localhost:6200/users/relogin', {email: emailU, password: passwordU})
            .then(response =>{
                localStorage.setItem("auth-token", response.data.token);
                window.location.replace('/PrinOn');
            })
            
            
        }).catch(err => {
            alert(err)
        })
        //window.location.replace('/PrinOn');
}
       render(){
       const { posts}=this.state
       console.log(posts)
       return(
           <div className="www">
               <div className="f-wrapper"> 
               <form onSubmit={this.submit}>
                    <p></p>
                    <h1>List of Cryptocurrencies </h1>
                    <p></p>
                    <p></p>
                
                <Table striped bordered hover size="sm" style={{width:'60%',margin:'auto'}}>
                        <thead>
                            <tr>
                               
                                <th>Symbol</th>
                                <th>Delete Crypto</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        posts.length ?
                    
                            posts.map(post=> <tr key={post.symbole}>
                            
                            <td style={{textAlign :'center'}}>{post}</td>
                            <td style={{textAlign :'center'}}><Button onClick={this.delete.bind(this, post)} variant="secondary">Delete</Button> </td>
                            </tr>):
                            null
                            }   
                        </tbody>
                    </Table>

                   <div className="createAccount" style={{width: '41%',position:'relative',left:'29%'}}>
                       <button type="submit"  className="btn btn-primary" >Submit</button>
                   </div>
                    </form>
                   <div className="createAccount" style={{width: '41%',position:'relative',left:'29%'}}>
                       <button onClick={this.retourPrincipale}  className="btn btn-primary" >Cancel</button>
                   </div>
                </div>
           </div>

       )
       }}
       export default DeleteCrypto