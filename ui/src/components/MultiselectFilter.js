import React, { Component } from 'react';
import Select from 'react-select';

class MultiselectFilter extends Component {
  onChange = (value, other) => {
    this.setState({selectedOptions: value});
    this.props.onChange(value);
  }

  render() {
    const filterOptions = [
      {value: 1, label: 'Auto'},
      {value: 2, label: 'Sports'},
      {value: 3, label: 'Fun'},
      {value: 4, label: 'Profit'}
    ];

    return(
      <div className="form-group">
          <label className="control-label" htmlFor={this.props.name}>Audience id(s)</label>
          <Select
            multi={true}
            name={this.props.name}
            options={filterOptions}
            value={this.props.selectedOptions}
            onChange={this.props.onChange}
            className="text-left col-lg-9 pull-right"
          />
      </div>
    );
  }
}

export default MultiselectFilter;
