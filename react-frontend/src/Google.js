import React, { Component } from 'react';

//Assets
import google from './google.png'
import axios from 'axios';
import config from './config';

class GoogleLogin extends Component{
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();    
    }
    
    //Triggering login for google
    googleLogin = () => {
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: config.google, //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }
    
    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    //console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            //console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                //console.log(e.message);
                //console.log('Import error - Error occured while importing data')
                return
            
            } else if (e.id) {
                //Profile data
                console.log( e.displayName );
                console.log({email : e.emails[0].value, username : e.displayName});
                axios.post("http://localhost:6200/users/authGoogle", {email : e.emails[0].value, username : e.displayName})
                    .then (response =>{
                        console.log(response.data.token)
                        localStorage.setItem("auth-token", response.data.token)
                        window.location.replace("/AjouterCrypto")
                    }).catch(err =>{
                        alert(err.message)
                })
            }
        }.bind(this));
    }
    
    render(){
        return(
            <img src={google} style={{width: '120%',position:'relative',top:'-0px',left:'140px'}} title="google login" alt="google" onClick={ () => this.googleLogin() }/>
        )
    }
}

export default GoogleLogin;