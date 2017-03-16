import React from 'react';
import _ from 'lodash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function getAggregatedColumn(data, column) {
  var total = 0;
  data.forEach(function(row){
    total += _.get(row, column.accessor, 0);
  });
  return total;
}

function getAveragedColumn(data, column) {
  return parseFloat(getAggregatedColumn(data, column) / data.length).toFixed(2);
}

function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getOverlayTooltip(value) {
  const tooltip = (
    <Tooltip id="urlTooltip">{value}</Tooltip>
  )
  return tooltip;
}


var tableColumnsConfig = [{
    header: ({data}) => <div><strong>Totals:</strong> ({data.length} pages)</div>,
    accessor: 'url',
    headerClassName: 'text-left',
    show: true,
    columns: [{
      header: 'URL',
      accessor: 'url',
      headerClassName: 'text-left',
      className: 'text-left',
      show: true,
      render: props => <OverlayTrigger placement="top" overlay={getOverlayTooltip(props.value)}><span>{props.value}</span></OverlayTrigger>
    }]
  },
  {
    header: '',
    accessor: 'domain_name',
    headerClassName: 'text-left',
    show: true,
    columns: [{
      header: 'Domain Name',
      accessor: 'domain_name',
      headerClassName: 'text-left',
      maxWidth: 300,
      className: 'text-left',
      show: true
    }]
  },
  {
    header: ({data, column}) => <div><strong>{formatNumberWithCommas(getAggregatedColumn(data, column))}</strong></div>,
    show: true,
    headerClassName: 'text-right',
    accessor: 'twentyfour_hour.ad_metrics.ad_starts',
    columns: [{
      header: 'Ad Starts',
      className: 'text-right',
      accessor: 'twentyfour_hour.ad_metrics.ad_starts',
      headerClassName: 'text-right',
      show: true,
      render: props => <div>{formatNumberWithCommas(props.value)}</div>
    }]
  },
  {
    header: ({data, column}) => <div><strong>{getAveragedColumn(data, column)}</strong></div>,
    show: true,
    headerClassName: 'text-right',
    accessor: 'twentyfour_hour.ad_metrics.completion_rank',
    columns: [{
      header: 'Completion Rank',
      accessor: 'twentyfour_hour.ad_metrics.completion_rank',
      className: 'text-right',
      headerClassName: 'text-right',
      show: true
    }]
  }]
  // {
  //   header: 'Skip Rank',
  //   accessor: 'twentyfour_hour.ad_metrics.skip_rank',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Fill Rate',
  //   accessor: 'twentyfour_hour.ad_metrics.fill_rate',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Utilization Rate',
  //   accessor: 'twentyfour_hour.ad_metrics.util_rate',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Click Rank',
  //   accessor: 'twentyfour_hour.page_metrics.click_rank',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Page Views',
  //   accessor: 'twentyfour_hour.page_metrics.pageview',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Scroll Rank',
  //   accessor: 'twentyfour_hour.page_metrics.scroll_rank',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Session Initiation Rank',
  //   accessor: 'twentyfour_hour.page_metrics.session_initiation_rank',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'Time Spent Rank',
  //   accessor: 'twentyfour_hour.page_metrics.timespent_rank',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // },
  // {
  //   header: 'PAR Score',
  //   accessor: 'twentyfour_hour.ad_metrics.par',
  //   className: 'text-right',
  //   headerClassName: 'text-right',
  //   show: true
  // }]


module.exports = tableColumnsConfig;