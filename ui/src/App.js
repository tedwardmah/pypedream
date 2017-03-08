import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import columnsConfig from './config/tableColumns.js'
import '../node_modules/react-select/dist/react-select.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      showTableControls: false,
      columnsConfig: columnsConfig
    }
  }

  componentDidMount = () => {
    this.fetchPages('/pages/random?limit=1000');
  }

  toggleFilters = (shouldShow) => {
    this.setState({
      showTableControls: !this.state.showTableControls
    });
  }

  fetchPages = (url) => {
    var self = this;
    // fetch('/attention.json')
    fetch('http://10.10.0.92:3002' + url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        self.setState({
          // tableData: json
          tableData: json.message.concat()
        });
      })
      .catch(function(err) {
        console.log('No data found', err);
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

  refreshTableData = (formData) => {
    var url = '/pages/random?limit=' + formData.count
    this.fetchPages(url);
  }

  render() {
    return (
      <div className="App">
        <MainHeader
          showTableControls={this.state.showTableControls}
          toggleFilterHandler={this.toggleFilters}
        />
        <DataTableControls
          showTableControls={this.state.showTableControls}
          onRefreshDataFormSubmit={this.refreshTableData}
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
