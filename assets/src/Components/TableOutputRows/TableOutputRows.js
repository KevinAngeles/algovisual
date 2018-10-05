// Include React
import React, {Component} from "react";
import helper from "./../utils/helper";

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
        <tbody></tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th></th>
            <th colspan="3"></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableOutputRows;
