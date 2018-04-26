import React, { Component } from 'react';
import Icon from '../Icon';
import { Input } from 'mdbreact';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            msg: ''
        }
    }

    handleSearch = (e) => {
        if (e.keyCode === 13){
            window.location.href = "/books/search/"+this.state.msg
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        return (
            <div>
            <Icon/>
            <div className="search center">
            <Input label="Boooooooooks!" name="msg" icon="search" group type="email" validate error="wrong" success="right" onKeyDown={this.handleSearch} onChange={this.handleChange}/>
            </div>
            </div>
        );
    }
}
export default Home