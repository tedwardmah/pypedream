import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class ListGroupToggler extends Component {
  onListItemToggle = (event) => {
    this.props.onListItemToggle(event);
  }

  render() {
    const listItems = this.props.listItems.map((listItem) =>
      <ListGroupItem key={listItem._id} onClick={this.onListItemToggle} active={listItem.active}>{listItem.label}</ListGroupItem>
    )

    return(
      <ListGroup>
        {listItems}
      </ListGroup>
    );
  }
}


class DataTableControls extends Component {

  checkboxClickHandler = (event) => {
    console.log(event);
  }

  render() {
    const columnsConfig = this.props.columnsConfig;
    const showTableControls = this.props.showTableControls;

    return (
      <div className="data-table-controls">
        <Panel collapsible expanded={showTableControls}>
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">
            <ListGroupToggler listItems={columnsConfig} onListItemToggle={this.checkboxClickHandler}/>
          </div>
        </Panel>
      </div>
    );
  }
}

export default DataTableControls;
