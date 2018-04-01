import React, { Component } from "react";
import { Button, Input } from 'mdbreact';

class Login extends Component {
    render() {
        return (
        <div class="user center">
        <hr/>
        <form>
        <p className="h5 text-center mb-4">Sign in</p>
        <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
        <Input label="Type your password" icon="lock" group type="password" validate/>
        <div className="text-center">
            <Button>Login</Button>
        </div>
        </form>
        </div>
        );
    }
}
export default Login;