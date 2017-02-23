import React, { Component } from 'react';
import logo from '../assets/logo.svg';
// import logo from '../assets/favicon/favicon-128.png';

class MainHeader extends Component {
  render() {
    return (
      <div className="main-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default MainHeader;
