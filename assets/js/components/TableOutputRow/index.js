// Include React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableOutputRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <tr>
        <td>{this.props.row.name}</td>
        <td>{this.props.row.burnTime}</td>
        <td>{this.props.row.arriveTime}</td>
        <td>{this.props.row.waitingTime}</td>
        <td>{this.props.row.turnaroundTime}</td>
      </tr>
    );
  }
}

TableOutputRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    burnTime: PropTypes.string.isRequired,
    arriveTime: PropTypes.string.isRequired,
    waitingTime: PropTypes.string.number,
    turnaroundTime: PropTypes.string.number
  }),
};


export default TableOutputRow;
