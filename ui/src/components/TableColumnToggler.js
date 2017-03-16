import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Checkbox } from 'react-bootstrap';

class TableColumnToggler extends Component {
  render() {
    const tableColumns = this.props.tableColumns.map((tableColumn) =>
      <ListGroupItem
        className="text-left suppress-focus-indicator list-group-item-column-toggle"
        key={tableColumn.accessor}
      >
        <Checkbox
          onChange={() => this.props.onColumnNameToggled(tableColumn)}
          checked={tableColumn.show}
        >
          {tableColumn.columns[0].header}
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

export default TableColumnToggler;
