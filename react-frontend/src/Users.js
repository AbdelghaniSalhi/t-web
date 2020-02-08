import React, { Component } from 'react';
import './assets/style.css';
import axios from 'axios';
class Users extends Component {

 
 constructor(props){
 super(props);
 this.state = {
 posts:[]
 }
 }
 componentDidMount(){
 axios.get('http://localhost:6200/users')
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
 <div>List Of Users 
 {
 posts.length ?
 posts.map(post=><div key={post.id}><p>{post.username} : </p> {post.email}</div>):
 null
 }
 </div>
 )
 }
}
export default Users