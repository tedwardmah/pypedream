import React, { Component } from 'react';
import MainHeader from './components/MainHeader.js';
import DataTable from './components/DataTable.js';
import DataTableControls from './components/DataTableControls.js';
import columnsConfig from './config/tableColumns.js';
import _ from 'lodash';

const APPLICATION_DOMAIN = 'http://producer.qa.01.bzgint.com:3002';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      rawData: [],
      showTableControls: true,
      columnsConfig: columnsConfig,
      selectedAudienceIds: [],
      audienceIdMappings: []
    }
  }

  componentDidMount = () => {
    // this.fetchPages('/pages/random?limit=1000');
    this.fetchPagesMock();
    this.fetchAudienceIdMappings();
  }

  toggleFilters = (shouldShow) => {
    this.setState({
      showTableControls: !this.state.showTableControls
    });
  }

  fetchAudienceIdMappings = () => {
    var self = this;
    fetch(APPLICATION_DOMAIN + '/settings/audienceId')
      .then(response => {
        return response.json();
      })
      .then(json => {
        let audienceIdMappings = json.message.map(function(item) {
          item.value = item.aud_id;
          return item;
        });
        let sortedAudienceIdMappings = _.sortBy(audienceIdMappings, 'label');
        self.setState({
          audienceIdMappings: sortedAudienceIdMappings
        });
      })
      .catch(function(err) {
        console.log('No data found', err);
      });
  }



  fetchPagesMock = () => {
    var self = this;
    fetch('/attention.json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        self.setState({
          rawData: json,
          tableData: json
        });
      })
      .catch(function(err) {
        console.log('No data found', err);
      });
  }

  fetchPages = (url) => {
    var self = this;
    // fetch('/attention.json')
    fetch(APPLICATION_DOMAIN + url)
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

  filterTableData = (path, audienceIdObjects) => {
    if (audienceIdObjects.length === 0) { // Filter cleared
      this.setState({
        tableData: this.state.rawData.concat()
      });
    } else {
      var audienceIds = audienceIdObjects.map(audienceIdObject => audienceIdObject.value + '');
      var tableData = this.state.rawData.filter(function(tableRow) {
        var shouldShow = false;
        audienceIds.forEach(function(audienceId) {
          if (tableRow[path].includes(audienceId)) {
            shouldShow = true;
          }
        });
        return shouldShow;
      });
      this.setState({
        tableData: tableData
      });

    }
  }

  filterByAudienceId = (value) => {
    this.setState({selectedAudienceIds: value});
    this.filterTableData('audienceIds', value);
  }

  onColumnToggled = (toggledColumn) => {
    var newConfig = this.state.columnsConfig;
    newConfig.forEach((column) => {
      if (column.accessor === toggledColumn.accessor) {
        column.show = !column.show;
        column.columns[0].show = !column.columns[0].show;
      }
    });
    this.setState({
      columnsConfig: newConfig.concat()
    })
  }

  refreshTableData = (formData) => {
    // var url = '/pages/' + formData.parComposition + '?limit=' + formData.count;
    // this.fetchPages(url);
    this.fetchPagesMock();
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
          audienceIdMappings={this.state.audienceIdMappings}
          selectedAudienceIds={this.state.selectedAudienceIds}
          onAudienceIdFilterChange={this.filterByAudienceId}
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
