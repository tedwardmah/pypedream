import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTableControls: true,
      columnsConfig: [{
        header: 'URL',
        accessor: 'url',
        show: true
      },
      {
        header: 'Domain Name',
        accessor: 'domain_name',
        show: true
      },
      {
        header: 'Ad Opportunities',
        accessor: 'twentyfour_hour.ad_metrics.ad_opps',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Ad Starts',
        accessor: 'twentyfour_hour.ad_metrics.ad_starts',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Ad Completions',
        accessor: 'twentyfour_hour.ad_metrics.ad_completes',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Completion Rank',
        accessor: 'twentyfour_hour.ad_metrics.completion_rank',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Skip Rank',
        accessor: 'twentyfour_hour.ad_metrics.skip_rank',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Fill Rate',
        accessor: 'twentyfour_hour.ad_metrics.fill_rate',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Utilization Rate',
        accessor: 'twentyfour_hour.ad_metrics.util_rate',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'Page Views',
        accessor: 'twentyfour_hour.page_metrics.pageview',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      },
      {
        header: 'PAR Score',
        accessor: 'twentyfour_hour.ad_metrics.par',
        className: 'align-right',
        headerClassName: 'align-right',
        show: true
      }]
    }
  }

  toggleFilterHandler = (shouldShow) => {
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
        <MainHeader showTableControls={this.state.showTableControls} toggleFilterHandler={this.toggleFilterHandler} />
        <DataTableControls
          showTableControls={this.state.showTableControls}
          onColumnToggled={this.onColumnToggled}
          tableColumns={this.state.columnsConfig}
        />
        <DataTable columnsConfig={this.state.columnsConfig} />
      </div>
    );
  }
}

export default App;
