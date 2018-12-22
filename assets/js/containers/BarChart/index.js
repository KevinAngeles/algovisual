import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Helper Function
import { drawYAxis, drawXAxis, drawBars } from '../../utils/graph';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // D3.js functions are not tied to the state. The chart will
    //  be updated here if and only if tableOutput was updated.
    // Note: The only way to update tableOutput is by removing or adding rows.
    //    Therefore, in this case, comparing lengths is a safe way to
    //    determine table updates.
    if(prevProps.tableOutput.length !== this.props.tableOutput.length) {
      const axisDomSelection = '#axis';
      const barsDomSelection = '#bars';
      const barHeight = 70;
      const graphWidth = this.props.width;
      const graphHeight = this.props.height;

      const isDataEmpty = (this.props.tableOutput.length === 0);
      // If there is no data, clear Y axis, otherwise, draw Y axis.
      drawYAxis(isDataEmpty,barHeight,axisDomSelection);
      // If there is no data, clear X axis, otherwise, draw X axis.
      drawXAxis(this.props.tableOutput,graphWidth,barHeight,axisDomSelection);
      // Draw bars
      drawBars(this.props.tableOutput,graphWidth,graphHeight,barHeight,barsDomSelection);
    }
  }

  render() {
    let svgWidth = this.props.width + this.props.margin.left + this.props.margin.right;
    let svgHeight = this.props.height + this.props.margin.top + this.props.margin.bottom;
    return(
      <svg ref={this.chartRef} shapeRendering="geometricPrecision" width={svgWidth} height={svgHeight}>
        <g transform="translate(30,60)">
          <g id="axis"></g>
          <g id="bars"></g>
          <g id="texts"></g>
        </g>
      </svg>
    );
  }
}

BarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  tableOutput: PropTypes.array,
};

const mapStateToProps = state => ({
  tableOutput: state.ui.tableOutput,
  width: state.ui.graph.width,
  height: state.ui.graph.height,
  margin: state.ui.graph.margin,
  barPadding: state.ui.graph.barPadding,
  barOuterPad: state.ui.graph.barOuterPad,
});

export default connect(
  mapStateToProps,
  null
)(BarChart);
