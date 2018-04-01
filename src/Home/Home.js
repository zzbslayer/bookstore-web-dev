import React, { Component } from 'react';
import Icon from '../Icon';
import { Input } from 'mdbreact';

class Home extends Component {
    render() {
        return (
            <div>
            <Icon/>
            <div className="search center">
            <Input label="Boooooooooks!" icon="search" group type="email" validate error="wrong" success="right"/>
            </div>
            </div>
        );
    }
}
export default Home