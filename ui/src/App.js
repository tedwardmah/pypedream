import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTableControls: false
    }
  }

  toggleFilterHandler = (shouldShow) => {
    this.setState({
      showTableControls: !this.state.showTableControls
    });
  }

  render() {
    return (
      <div className="App">
        <MainHeader showTableControls={this.state.showTableControls} toggleFilterHandler={this.toggleFilterHandler} />
        <DataTableControls showTableControls={this.state.showTableControls} />
        <DataTable />
      </div>
    );
  }
}

export default App;
