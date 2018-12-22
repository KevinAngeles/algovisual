// Include React
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProcess } from '../../actions';
import TableInputRow from '../../components/TableInputRow';

import Helper from '../../utils/helper';

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
              return (<TableInputRow row={item} key={index} removeProcess={this.props.removeProcess} />);
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th>{Helper.getTotalBurnTime(this.props.rows)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

TableInputRows.propTypes = {
  removeProcess: PropTypes.func,
  rows: PropTypes.array,
};

const mapStateToProps = state => ({
  rows: state.ui.tableInput
});

const mapDispatchToProps = {
  removeProcess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableInputRows);
