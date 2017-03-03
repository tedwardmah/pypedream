import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import columnsConfig from './config/tableColumns.js'
import './App.css';
import '../node_modules/react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      showTableControls: true,
      columnsConfig: columnsConfig
    }
  }

  componentDidMount() {
    var self = this;
    fetch('/attention.json')
    // fetch('http://10.10.0.92:3002/pages')
      .then(response => {
        return response.json();
      })
      .then(json => {
        // var smallerDataSet = json.message.slice(0, 1000);
        self.setState({
          tableData: json
          // data: smallerDataSet
        });
      })
      .catch(function(err) {
        console.log('No data found');
      });
  }

  toggleFilters = (shouldShow) => {
    this.setState({
      showTableControls: !this.state.showTableControls
    });
  }

  onColumnToggled = (toggledColumn) => {
    var newConfig = this.state.columnsConfig;
    newConfig.forEach((column) => {
      if (column.accessor === toggledColumn.accessor) {
        column.show = !column.show;
      }
    });
    this.setState({
      columnsConfig: newConfig.concat()
    })

  }

  render() {
    return (
      <div className="App">
        <MainHeader showTableControls={this.state.showTableControls} toggleFilterHandler={this.toggleFilters} />
        <DataTableControls
          showTableControls={this.state.showTableControls}
          onColumnToggled={this.onColumnToggled}
          tableColumns={this.state.columnsConfig}
        />
        <DataTable
          tableData={this.state.tableData}
          columnsConfig={this.state.columnsConfig}
        />
      </div>
    );
  }
}

export default App;
