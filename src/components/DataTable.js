import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DataTable extends Component {
  render() {

    return (
      <div className="data-table-container">
      	<ReactTable
      		data={this.props.tableData}
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
