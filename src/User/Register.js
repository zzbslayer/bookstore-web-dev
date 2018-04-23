import React, { Component } from "react";
import { Button, Input } from 'mdbreact';
import { proxy } from '../Global'

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            username:null,
            password:null,
            email:null,
            phone:null
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: [e.target.value]})
    }

    handleRegister = (e) => {
        e.preventDefault();
        let data = "username="+encodeURIComponent(this.state.username)+
            "&password="+encodeURIComponent(this.state.password)+
            "&email="+encodeURIComponent(this.state.email)+
            "&phone="+encodeURIComponent(this.state.phone)

        fetch(proxy+"/register",{
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
            if (result.username==this.state.username){
                alert("Register Success!")
                window.location.href= "/login"
            }
            
        },
        (error) => {
            this.setState({
                error
            });
            }
        )
    }

    render() {
        return (
        <div className="user center">
        <hr/>
        <form>
        <p className="h5 text-center mb-4">Sign up</p>
        <Input label="Username" icon="user" group type="email" validate error="wrong" success="right" name="username" onChange={this.handleChange}/>
        <Input label="Email" icon="envelope" group type="email" validate error="wrong" success="right" name="email" onChange={this.handleChange}/>
        <Input label="Phone" icon="phone" group validate error="wrong" success="right" name="phone" onChange={this.handleChange}/>
        <Input label="Password" icon="lock" group type="password" validate name="password" onChange={this.handleChange}/>
        <div className="text-center">
            <Button color="deep-orange" type="submit" onClick={this.handleRegister}>Sign up</Button>
        </div>
        </form>
        </div>
        );
    }
}
export default Register;