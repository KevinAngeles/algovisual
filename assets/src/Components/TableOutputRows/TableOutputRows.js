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
      <table id="tableOutput" className="col-xs-10 xs-offset-1 col-sm-10 sm-offset-1 col-md-10 md-offset-1 col-lg-6">
        <thead>
          <tr>
            <th colSpan={5}>Output</th>
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
              return (<TableRow row={item} key={item.uniqueId}/>);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{helper.getTotalBurnTime(this.props.rows)}</th>
            <th colSpan={3}></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableOutputRows;
