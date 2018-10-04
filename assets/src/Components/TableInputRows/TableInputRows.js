// Include React
import React, {Component} from "react";
import helpers from "./../utils/helpers";

function TableRow(props) {
  return (
    <tr>
      <td>{props.row.name}</td>
      <td>{props.row.arriveTime}</td>
      <td>{props.row.burnTime}</td>
      <td><button type="button" className="btn btn-danger" data-key={props.row.idx} onClick={props.handleClickButton}>Remove</button></td>
    </tr>
  );
}

class TableInputRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table id="tableInput">
        <thead>
          <tr>
            <th align="center" colspan="4">Data</th>
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
              return (<TableRow row={item}
               handleClickButton={this.props.handleClickButton} />);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th align="left" colspan="2">Total</th>
            <th>{helpers.getTotalBurnTime(this.props.rows)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TableInputRows;
