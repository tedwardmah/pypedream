import React, { Component } from 'react';
import { Button, Form, ControlLabel, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import menuOptionsConfig from '../config/menuOptionsConfig.js';

class RefreshDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '1000',
      parComposition: menuOptionsConfig.parCompositionOptions[0],
    };
  }

  onResultCountChange = (event) => {
    this.setState({count: event.target.value});
  }

  onParCompositionSelect = (eventKey, event) => {
    var newOption = menuOptionsConfig.parCompositionOptions.find(option => option.value === eventKey);
    this.setState({parComposition: newOption});
  }

  onRefreshDataFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      count: this.state.count,
      parComposition: this.state.parComposition.value
    });
  }

  render() {
    const parCompositionOptions = menuOptionsConfig.parCompositionOptions.map((parCompositionOption) =>
      <MenuItem key={parCompositionOption.value} eventKey={parCompositionOption.value}>
        {parCompositionOption.label}
      </MenuItem>
    )

    return (
      <div className="row">
        <Form inline>
          <FormGroup controlId="parCompositionSelector">
            <DropdownButton onSelect={this.onParCompositionSelect} title={this.state.parComposition.label} id="dropdown-size-large">
              {parCompositionOptions}
            </DropdownButton>
          </FormGroup>
          {' '}
          <FormGroup controlId="resultCountInput">
            <FormControl type="number" value={this.state.count} onChange={this.onResultCountChange} />
            {' '}
            <ControlLabel>
              Pages (by PAR)
            </ControlLabel>
          </FormGroup>
          {' '}
        </Form>
        <div className="row inline-form-submit">
          <Button onClick={this.onRefreshDataFormSubmit} type="submit"><span className="glyphicon glyphicon-circle-arrow-down"></span> Fetch New Data</Button>
        </div>
      </div>
    )
  }
}

export default RefreshDataForm;