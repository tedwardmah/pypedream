import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DataTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			columns: [{
				header: 'URL',
				accessor: 'url'
			},
			{
				header: 'Domain Name',
				accessor: 'domain_name'
			},
			{
				header: 'PAR Score',
				accessor: '24_hour.ad_metrics.par'
			},
			{
				header: 'Ad Starts',
				accessor: '24_hour.ad_metrics.ad_starts'
			},
			{
				header: 'Ad Opportunities',
				accessor: '24_hour.ad_metrics.ad_opps'
			}]
		}
	}

	componentDidMount() {
		var self = this;
		fetch('/attention.json')
			.then(response => {
				return response.json();
			})
			.then(json => {
				self.setState({
					data: json
				});
			})
			.catch(function(err) {
				console.log('No data found');
			});
	}

  render() {
    return (
      <div className="data-table-container">
      	<p>Data Length: {this.state.data.length}</p>
      	<ReactTable
      		data={this.state.data}
      		columns={this.state.columns}
      		defaultPageSize={0}
      		pageSize={this.state.data.length}
      		showPagination={false}
      		showPageSizeOptions={false}
      	/>
      </div>
    );
  }
}

export default DataTable;
