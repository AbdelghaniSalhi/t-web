import React, { Component } from 'react';
import './assets/style.css';
import axios from 'axios';

class ListeCrypto extends Component {
 
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
   /* <div>List Of Cryptos 
    {
    posts.length ?
    posts.map(post=><div key={post.id}><p>{post.id} : </p> {post.name} {post.price}</div>):
    null
    }
    </div>*/
    
<html>

<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css?family=Handlee|Open+Sans:300,400,600,700,800" rel="stylesheet">
  <link href="css/bootstrap.css" rel="stylesheet" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" />
  <link href="css/flexslider.css" rel="stylesheet" />
  <link href="css/prettyPhoto.css" rel="stylesheet" />
 
  <link href="css/jquery.bxslider.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />

  <link href="color/default.css" rel="stylesheet" />

  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png" />
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="ico/apple-touch-icon-72-precomposed.png" />
  <link rel="apple-touch-icon-precomposed" href="ico/apple-touch-icon-57-precomposed.png" />
  <link rel="shortcut icon" href="ico/favicon.png" />

 
</head>

<body>

  <div id="wrapper">

    <header>
     
      <div class="container">
        <div class="row nomargin">
          <div class="span4">
          </div>
          <div class="span8">
            <div class="navbar navbar-static-top">
              <div class="navigation">
                <nav>
                  <ul class="nav topnav">
                    <li >
                      <a href=".html">Inscription </a>
                    </li>
                    <li>
                      <a href="contact.html">Connexion </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  

   


    <section id="works">
      <div class="container">
        <div class="row">
          <div class="span12">
            <h4 class="title">List <strong>Cryptos</strong></h4>
            <div class="row">

              <div class="grid cs-style-4">
                <div class="span3">
                  <div class="item">
                    <figure>
                      <div><img src="img/dummies/works/1.jpg" alt="" /></div>
                      
                    </figure>
                  </div>
                </div>
                

            </div>
          </div>
        </div>
      </div>
    </section>

    
  </div>
  <a href="#" class="scrollup"><i class="icon-angle-up icon-square icon-bglight icon-2x active"></i></a>

  
  <script src="js/jquery.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/bootstrap.js"></script>

  <script src="js/modernizr.custom.js"></script>
  <script src="js/toucheffects.js"></script>
  <script src="js/google-code-prettify/prettify.js"></script>
  <script src="js/jquery.bxslider.min.js"></script>
  <script src="js/camera/camera.js"></script>
  <script src="js/camera/setting.js"></script>

  <script src="js/jquery.prettyPhoto.js"></script>
  <script src="js/portfolio/jquery.quicksand.js"></script>
  <script src="js/portfolio/setting.js"></script>

  <script src="js/jquery.flexslider.js"></script>
  <script src="js/animate.js"></script>
  <script src="js/inview.js"></script>

  <script src="js/custom.js"></script>













































































































































  
    <div>List Of Cryptos 
    <div class="container">
    { posts.length ?
        posts.map(post=>
    <div class="col" key={post.id}>
      
    <div  class="card__header">
    <h3 class="card__header-title">{post.name}</h3>
    <p class="card__header-meta">Symbol : {post.symbol}</p>
    <p class="card__header-meta">Le prix : {post.price}</p>
    
        
      
    </div>
  </div>):
  null}
  </div>
  </div>
  </body>
  </html>
    )
    }
}
export default ListeCrypto