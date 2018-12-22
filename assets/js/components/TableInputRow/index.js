// Include React
import React, {Component} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

class TableInputRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <tr>
        <td>{this.props.row.name}</td>
        <td>{this.props.row.arriveTime}</td>
        <td>{this.props.row.burnTime}</td>
        <td className="p-0"><Button id="clearAll" color="danger" data-key={this.props.row.idx} onClick={ ev => this.props.removeProcess(parseInt(ev.target.getAttribute('data-key'))) }>Remove</Button></td>
      </tr>
    );
  }
}

TableInputRow.propTypes = {
  row: PropTypes.object,
  removeProcess: PropTypes.func,
  name: PropTypes.string,
  arriveTime: PropTypes.string,
  burnTime: PropTypes.string,
};

export default TableInputRow;
