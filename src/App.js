import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTableControls: false,
      columnsConfig: [{
        header: 'URL',
        accessor: 'url'
      },
      {
        header: 'Domain Name',
        accessor: 'domain_name'

      },
      {
        header: 'Ad Opportunities',
        accessor: '24_hour.ad_metrics.ad_opps',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Ad Starts',
        accessor: '24_hour.ad_metrics.ad_starts',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Ad Completions',
        accessor: '24_hour.ad_metrics.ad_completes',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Completion Rank',
        accessor: '24_hour.ad_metrics.completion_rank',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Skip Rank',
        accessor: '24_hour.ad_metrics.skip_rank',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Fill Rate',
        accessor: '24_hour.ad_metrics.fill_rate',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'Utilization Rate',
        accessor: '24_hour.ad_metrics.util_rate',
        className: 'align-right',
        headerClassName: 'align-right'
      },
      {
        header: 'PAR Score',
        accessor: '24_hour.ad_metrics.par',
        className: 'align-right',
        headerClassName: 'align-right'
      }]
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
        <DataTableControls showTableControls={this.state.showTableControls} columnsConfig={this.state.columnsConfig} />
        <DataTable columnsConfig={this.state.columnsConfig} />
      </div>
    );
  }
}

export default App;
