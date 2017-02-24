import React, { Component } from 'react';
import logo from '../assets/logo.svg';
// import logo from '../assets/favicon/favicon-128.png';
import { Button } from 'react-bootstrap';

class MainHeader extends Component {
  onFilterToggleClick = () => {
    this.props.toggleFilterHandler();
  }

  render() {
    return (
      <div className="main-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button className="pull-right" bsStyle="default" onClick={this.onFilterToggleClick}>
          {this.props.showTableControls ? 'Hide' : 'Show'} Filters
        </Button>
      </div>
    );
  }
}

export default MainHeader;
