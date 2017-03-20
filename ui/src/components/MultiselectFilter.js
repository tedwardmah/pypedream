import React, { Component } from 'react';
import Select from 'react-select';

class MultiselectFilter extends Component {
  onChange = (value, other) => {
    this.setState({selectedOptions: value});
    this.props.onChange(value);
  }

  optionRenderer = (obj, index) => {
    return <div><strong>{obj.label}</strong> ({obj.value})</div>
  }

  render() {
    const filterOptions = this.props.filterOptions;

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
            optionRenderer={this.optionRenderer}
          />
      </div>
    );
  }
}

export default MultiselectFilter;
