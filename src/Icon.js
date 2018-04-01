import React, { Component } from 'react';
import logo from './logo.svg';
import './Icon.css';

class Icon extends Component {
  render() {
    return (
      <div className="Icon">
        <header className="Icon-header">
        <h1 className="Icon-title">Welcome to BookStore</h1>
          <img src={logo} className="Icon-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Icon;
