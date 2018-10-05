// Include React
import React, {Component} from "react";
import helper from "./../utils/helper";

function TableRow(props) {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.burnTime}</td>
      <td>{props.row.arriveTime}</td>
      <td>{props.row.waitingTime}</td>
      <td>{props.row.turnaroundTime}</td>
    </tr>
  );
}

class TableOutputRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <table id="tableOutput">
        <thead>
          <tr>
            <th colspan="5">Output</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Burn Time</th>
            <th>Arrive Time</th>
            <th>Waiting Time</th>
            <th>TurnAround Time</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map((item,index) => {
              return (<TableRow row={item} />);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th></th>
            <th colspan="3">{helper.getTotalBurnTime(this.props.rows)}</th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableOutputRows;
