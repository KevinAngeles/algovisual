// Include React
import React, { Component } from 'react';
import { getTotalBurnTime } from '../../utils/helper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableOutputRow from '../../components/TableOutputRow';

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
            this.props.rows.map( item => {
              return (<TableOutputRow row={item} key={item.uniqueId}/>);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{getTotalBurnTime(this.props.rows)}</th>
            <th colSpan={3}></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

TableOutputRows.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      burnTime: PropTypes.number.isRequired,
      arriveTime: PropTypes.number.isRequired,
      waitingTime: PropTypes.number.isRequired,
      turnaroundTime: PropTypes.number.isRequired,
    })
  ),
};

const mapStateToProps = state => ({
  rows: state.ui.tableOutput
});

export default connect(
  mapStateToProps,
  null
)(TableOutputRows);
