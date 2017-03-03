import React, { Component } from 'react';
import { Button, Form, ControlLabel, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

class RefreshDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topN: '1000'
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
        <FormGroup controlId="topBottomSelector">
          <DropdownButton title="Top" id="dropdown-size-large">
            <MenuItem eventKey="1">Top</MenuItem>
            <MenuItem eventKey="2" disabled>Bottom</MenuItem>
            <MenuItem eventKey="3" disabled>Random</MenuItem>
          </DropdownButton>
        </FormGroup>
        {' '}
        <FormGroup controlId="resultCountInput">
          <FormControl type="number" value={this.state.topN} onChange={this.handleChange} />
          {' '}
          <ControlLabel>
            Pages (by PAR):
          </ControlLabel>
        </FormGroup>
        {' '}
        <Button type="submit">Fetch New Data</Button>
      </Form>
    )
  }
}

export default RefreshDataForm;