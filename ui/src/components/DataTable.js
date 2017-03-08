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
      	<ReactTable
      		data={this.state.data}
      		columns={this.state.columns}
      		defaultPageSize={20}
      		defaultSorting={[{
      			id: "24_hour.ad_metrics.par",
      			desc: true
      		}]}
      		className='-striped -highlight'
      		// pageSize={this.state.data.length}
      		showPagination={true}
      		showPageSizeOptions={true}
      	/>
      </div>
    );
  }
}

export default DataTable;
