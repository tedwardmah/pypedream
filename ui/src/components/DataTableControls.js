import React, { Component } from 'react';
import RefreshDataForm from './RefreshDataForm.js';
import TableColumnToggler from './TableColumnToggler.js';
import MultiselectFilter from './MultiselectFilter.js';
import { Panel } from 'react-bootstrap';

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
              <div className="row">
                <RefreshDataForm className="col-lg-6" onSubmit={this.props.onRefreshDataFormSubmit}/>
                <div className="form-horizontal col-lg-6">
                  <MultiselectFilter
                    name="audience-id-filter"
                    onChange={this.props.onAudienceIdFilterChange}
                    selectedOptions={this.props.selectedAudienceIds}
                    filterOptions={this.props.audienceIdMappings}
                  />
                </div>
              </div>
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
