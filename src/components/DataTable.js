import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DataTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		var self = this;
		// fetch('/attention.json')
		fetch('http://10.10.0.92:3002/pages')
			.then(response => {
				return response.json();
			})
			.then(json => {
				var smallerDataSet = json.message.slice(0, 1000);
				self.setState({
					data: smallerDataSet
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
      		columns={this.props.columnsConfig}
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
