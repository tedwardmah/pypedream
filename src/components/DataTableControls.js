import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class TableColumnToggler extends Component {
  render() {
    const tableColumns = this.props.tableColumns.map((tableColumn) =>
      <ListGroupItem
        key={tableColumn.accessor}
        onClick={() => this.props.onColumnNameToggled(tableColumn)}
        active={tableColumn.show}
      >
        {tableColumn.header}
      </ListGroupItem>
    )

    return(
      <ListGroup>
        {tableColumns}
      </ListGroup>
    );
  }
}


class DataTableControls extends Component {
  render() {
    const tableColumns = this.props.tableColumns;
    const showTableControls = this.props.showTableControls;

    const halfIndex = Math.round(tableColumns.length / 2);
    const tableColumnsGroup1 = tableColumns.slice(0, halfIndex);
    const tableColumnsGroup2 = tableColumns.slice(halfIndex, tableColumns.length);

    return (
      <div className="data-table-controls">
        <Panel collapsible expanded={showTableControls}>
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">
            <div className="col-sm-6">
              <TableColumnToggler tableColumns={tableColumnsGroup1} onColumnNameToggled={this.props.onColumnToggled}/>
            </div>
            <div className="col-sm-6">
              <TableColumnToggler tableColumns={tableColumnsGroup2} onColumnNameToggled={this.props.onColumnToggled}/>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

export default DataTableControls;
