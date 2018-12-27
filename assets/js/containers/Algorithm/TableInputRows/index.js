// Include React
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProcess } from '../../../actions';
import TableInputRow from '../../../components/TableInputRow';

import { getTotalBurnTime } from '../../../utils/helper';

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
            this.props.rows.map( process => {
              return (<TableInputRow row={process} key={process.uniqueId} removeProcess={this.props.removeProcess} routeProps={this.props.routeProps}/>);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th>{getTotalBurnTime(this.props.rows)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

TableInputRows.propTypes = {
  routeProps: PropTypes.object,
  removeProcess: PropTypes.func,
  rows: PropTypes.array,
};

const mapStateToProps = state => ({
  rows: state.ui.tableInput,
  selectedAlgorithmId: state.algorithm.selected.id,
});

const mapDispatchToProps = {
  removeProcess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableInputRows);
