import React, { Component } from 'react';
import { Button, Form, ControlLabel, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

class RefreshDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '1000'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({count: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      count: this.state.count
    });
  }

  render() {
    return (
      <div className="row">
        <Form inline>
          <FormGroup controlId="topBottomSelector">
            <DropdownButton title="Random" id="dropdown-size-large">
              <MenuItem eventKey="1">Random</MenuItem>
              <MenuItem eventKey="2" disabled>Top</MenuItem>
              <MenuItem eventKey="3" disabled>Bottom</MenuItem>
            </DropdownButton>
          </FormGroup>
          {' '}
          <FormGroup controlId="resultCountInput">
            <FormControl type="number" value={this.state.count} onChange={this.handleChange} />
            {' '}
            <ControlLabel>
              Pages (by PAR)
            </ControlLabel>
          </FormGroup>
          {' '}
        </Form>
        <div className="row inline-form-submit">
          <Button onClick={this.handleSubmit} type="submit"><span className="glyphicon glyphicon-circle-arrow-down"></span> Fetch New Data</Button>
        </div>
      </div>
    )
  }
}

export default RefreshDataForm;