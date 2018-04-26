import React, { Component } from "react"
import { Button, Input } from 'mdbreact'
import Cookies from 'universal-cookie'
import { proxy } from '../Global'
import { message } from 'antd'

let cookies = new Cookies()

class Login extends Component {

    constructor(props){
        super(props)
        console.log(this.props)
        this.handleLogin = props.handleLogin
        this.state={
            username:'',
            password:'',
            error:false,
        }
    }

    

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state)
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13){
            this.handleSubmit(e)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let username = this.state.username
        let password = this.state.password
        if (username===null || password===null){
            message.error("Info Cannot Be Empty")
            return
        }
        let data = "username="+ encodeURIComponent(username) +"&password="+encodeURIComponent(password)
        console.log("data:"+data)
        fetch(proxy+"/login", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: data
        })
        .then(res => res.json())
        .then(
        (result) => {
            //eslint-disable-next-line            
            if (result.user.username==this.state.username){
                message.success('Login Success!')
                console.log(result.user)
                console.log(result.user.avatar)
                this.handleLogin(result.user.username, result.role, result.user.avatar)
            }
            else
                message.error("Login error: Message mismatched")
        },
        (error) => {
            message.error("Login error:\n"+error)
            }
        )
    }

    render() {
        if (cookies.get('JSESSIONID')){
            window.location.href = "/";
        }
        else{
            return (
                <div className="user center">
                <hr/>
                <form>
                <p className="h5 text-center mb-4">Sign in</p>
                <Input name="username" label="Type your username" icon="envelope" onChange={this.handleChange}/>
                <Input name="password" label="Type your password" icon="lock" group type="password" validate onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                <div className="text-center">
                    <Button onClick={this.handleSubmit}>Login</Button>
                </div>
                </form>
                </div>
            );
        }
    }
}
export default Login;