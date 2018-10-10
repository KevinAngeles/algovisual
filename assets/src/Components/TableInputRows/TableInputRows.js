// Include React
import React, {Component} from "react";
import {Button} from 'reactstrap';

import helper from "./../utils/helper";

function TableRow(props) {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.arriveTime}</td>
      <td>{props.row.burnTime}</td>
      <td className="p-0"><Button id="clearAll" color="danger" data-key={props.row.idx} onClick={props.handleRemoveButton}>Remove</Button></td>
    </tr>
  );
}

class TableInputRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table id="tableInput" className="col-xs-10 xs-offset-1 col-sm-10 sm-offset-1 col-md-10 md-offset-1 col-lg-6">
        <thead>
          <tr>
            <th colSpan={4}>Data</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Arrive Time</th>
            <th>Burn Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map((item,index) => {
              item.idx = index;
              return (<TableRow row={item} key={index}
               handleRemoveButton={this.props.handleRemoveButton} />);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th>{helper.getTotalBurnTime(this.props.rows)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableInputRows;
