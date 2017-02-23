import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainHeader />
        <DataTable />
      </div>
    );
  }
}

export default App;
