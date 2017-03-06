import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class DataTableControls extends Component {
  render() {
    const showTableControls = this.props.showTableControls;

    return (
      <div className="data-table-controls">
        <Panel collapsible expanded={showTableControls}>
          Filter controls will go here....
        </Panel>
      </div>
    );
  }
}

export default DataTableControls;
