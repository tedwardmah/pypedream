import React, { Component } from 'react';
import { Button, Form, ControlLabel, FormGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import menuOptionsConfig from '../config/menuOptionsConfig.js';

class RefreshDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultCount: '1000',
      parComposition: menuOptionsConfig.parCompositionOptions[0],
    };
  }

  onResultCountChange = (event) => {
    this.setState({resultCount: event.target.value});
  }

  onParCompositionSelect = (eventKey, event) => {
    var newOption = menuOptionsConfig.parCompositionOptions.find(option => option.value === eventKey);
    this.setState({parComposition: newOption});
  }

  onRefreshDataFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      count: this.state.resultCount,
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
      <div className="col-lg-6 col-md-12">
        <Form inline>
          <FormGroup controlId="parCompositionSelector">
            <DropdownButton onSelect={this.onParCompositionSelect} title={this.state.parComposition.label} id="dropdown-size-large">
              {parCompositionOptions}
            </DropdownButton>
          </FormGroup>
          {' '}
          <FormGroup controlId="resultCountInput">
            <FormControl type="number" value={this.state.resultCount} onChange={this.onResultCountChange} />
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