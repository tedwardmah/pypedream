import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Button, Form, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

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

class RefreshDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topN: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({topN: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      topN: this.state.topN
    });
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="name">
          <ControlLabel>
            Top N Pages (by PAR):
          </ControlLabel>
          {' '}
          <FormControl type="number" value={this.state.topN} onChange={this.handleChange} />
        </FormGroup>
        {' '}
        <Button type="submit">Fetch New Data</Button>
      </Form>
    )
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
