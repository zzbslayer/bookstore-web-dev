import React, { Component } from "react";
import { Button, Input } from 'mdbreact';

class Register extends Component {
    render() {
        return (
        <div class="user center">
        <hr/>
        <form>
        <p className="h5 text-center mb-4">Sign up</p>
        <Input label="Your name" icon="user" group type="email" validate error="wrong" success="right"/>
        <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
        <Input label="Your password" icon="lock" group type="password" validate/>
        <div className="text-center">
            <Button color="deep-orange">Sign up</Button>
        </div>
        </form>
        </div>
        );
    }
}
export default Register;