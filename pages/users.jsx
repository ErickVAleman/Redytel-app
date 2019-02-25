import React, { Component } from "react";
import Router from "next/router";
import LyLayout from "../layoutComponets/LyLayout";

export default class Index extends Component {
    constructor(loginUser, sessionUser){
        super(loginUser, sessionUser)
        this.loginUser = loginUser;
        this.sessionUser = sessionUser;
        this.state = {
            user: {}
        }
    }
    async componentDidMount() {
        try{
            this.loginUser = await localStorage.getItem('loginUser');
            this.sessionUser = await sessionStorage.getItem('loginUser');
            if (!this.loginUser && !this.sessionUser){
                console.log("Te vas pero derechito alv", this.loginUser, this.sessionUser);
                Router.push('/login');
            }else { 
                console.log("Te encuentras Logeado", this.loginUser, this.sessionUser);
                this.setState({ user: JSON.parse(this.loginUser) });
            }
        }catch(err){
            throw new Error(err);
        }
    }
    render(){
        return (
            <LyLayout validate={this.sessionUser} footer="Milka's App 2019@2020" >
                Users
            </LyLayout>
        )
    }
}