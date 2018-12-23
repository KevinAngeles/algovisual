import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSelectedAlgorithm, removeAllProcesses, resetFormInputs } from '../../actions';

// Import sub-components
import FormInput from './FormInput';
import JumboTron from './JumboTron';
import NavBar from '../../components/NavBar';
import TableInputRows from './TableInputRows';
import TableOutputRows from './TableOutputRows';
import BarChart from './BarChart';

class Algorithm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateSelectedAlgorithm(this.props.routeProps.match.params.id);
    this.props.removeAllProcesses();
    this.props.resetFormInputs();
  }

  render() {
    return (
      <Container>
        <NavBar/>
        <JumboTron/>
        <div className="container-form">
          <div id="formContainer">
            <h2>Instructions:</h2>
            <ul>
              <li>Fill the form with the name of the process, arrive time, burn time and click on {'Add.'}</li>
              <li>Repeat the same steps for each process.</li>
              <li>Every time the button {'Add'} is clicked, the result will be reordered in the table {'Output.'} Additionally, the bar charts below the tables will also be updated.</li>
              <li>In order to remove a single process, click on the button {'Remove'} in the desired row.</li>
              <li>In order to remove all the processes, click on the button {'Clear All'} above the table.</li>
            </ul>
            <FormInput routeProps={this.props.routeProps}/>
          </div>
          <Row className="tables no-gutters">
            <TableInputRows routeProps={this.props.routeProps}/>
            <TableOutputRows/>
          </Row>
        </div>
        <div>
          <div id="graph">
            <BarChart/>
          </div>
        </div>
      </Container>
    );
  }
}


Algorithm.propTypes = {
  algorithms: PropTypes.array,
  updateSelectedAlgorithm: PropTypes.func,
  resetFormInputs: PropTypes.func,
  routeProps: PropTypes.object,
  removeAllProcesses: PropTypes.func,
};

const mapStateToProps = state => ({
  algorithms: state.algorithm.scheduling,
});

const mapDispatchToProps = {
  updateSelectedAlgorithm,
  removeAllProcesses,
  resetFormInputs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Algorithm);
