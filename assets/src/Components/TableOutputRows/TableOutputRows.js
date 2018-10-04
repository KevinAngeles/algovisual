// Include React
import React, {Component} from "react";
import helpers from "./../utils/helpers";

class TableOutputRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <table id="tableOutput" className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-0" cellpadding="6" rules="groups" frame="box">
        <thead>
          <tr>
            <th align="center" colspan="5">Output</th>
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
            <th align="left">Total</th>
            <th></th>
            <th colspan="3"></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableOutputRows;
