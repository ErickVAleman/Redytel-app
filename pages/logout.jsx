import React, { Component } from "react";
import Router from "next/router";
import { Col, Row, Button } from "antd";
import LyLayout from "../layoutComponets/LyLayout";

export default class LogOut extends Component {
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
    onRedirectIndex(){
    }
    
    componentDidUpdate(){
        localStorage.removeItem('loginUser');
        sessionStorage.removeItem('loginUser');
        Router.push('/')
    }
    render(){
        return (
            <LyLayout validate={this.sessionUser} footer="Milka's App 2019@2020" >
                <Row>
                    <Col span={8} />
                    <Col style={{ textAlign: "center" }} span={8} > 
                        Adios We
                    </Col>
                    <Col span={8} />
                </Row>
            </LyLayout>
        )
    }
}