import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
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
  margin: PropTypes.object
};

export default BarChart;