import React, { Component } from 'react';
import RefreshDataForm from './RefreshDataForm.js';
// import Checkbox from './Checkbox.js';
import { Panel, ListGroup, ListGroupItem, Checkbox } from 'react-bootstrap';

class TableColumnToggler extends Component {
  render() {
    const tableColumns = this.props.tableColumns.map((tableColumn) =>
      <ListGroupItem
        className="text-left suppress-focus-indicator"
        key={tableColumn.accessor}
      >
        <Checkbox
          onClick={() => this.props.onColumnNameToggled(tableColumn)}
          checked={tableColumn.show}
        >
          {tableColumn.header}
        </Checkbox>
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
          <div className='row'>
            <div className="col-sm-6 panel-controls-left">
              <RefreshDataForm onSubmit={this.props.onRefreshDataFormSubmit}/>
            </div>
            <div className="col-sm-6 panel-controls-right">
              <div className="row">
                <div className="col-sm-6">
                  <TableColumnToggler tableColumns={tableColumnsGroup1} onColumnNameToggled={this.props.onColumnToggled}/>
                </div>
                <div className="col-sm-6">
                  <TableColumnToggler tableColumns={tableColumnsGroup2} onColumnNameToggled={this.props.onColumnToggled}/>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

export default DataTableControls;
