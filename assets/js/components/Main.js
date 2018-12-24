import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSelectedAlgorithm } from '../actions';

// Import sub-components
import Algorithm from '../containers/Algorithm';
import NavBar from '../components/NavBar';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" render={() => (
            <Container>
              <NavBar/>
              <Jumbotron>
                <h2>Scheduling Algorithms</h2>
                <p>Welcome to AlgoVisual! This is a web page created to explain and illustrate some common scheduling algorithms.</p>
                <figure>
                  <img src={`images/processChart.png`} alt={`Example of process scheduling`}/>
                </figure>
                <p>Scheduling algorithms can be classified as preemptive and Non preemptive.</p>
                <h3>Non Preemptive Algorithms</h3>
                <p>A scheduling algorithm is non preemptive if it does not wait for a given process to finish before moving on to the next process.</p>
                <p>To begin, please click on one of the algorithms below.</p>
                <ul id="algoLinks">
                  {
                    this.props.algorithms.map( algorithm => (
                      <li key={algorithm.id}><NavLink to={`/algorithm/${algorithm.id}`} className={'btn btn-primary'} onClick={ () => this.props.updateSelectedAlgorithm(algorithm.id) }>{algorithm.name}</NavLink></li>
                    ))
                  }
                </ul>
              </Jumbotron>
            </Container>
          )}/>
          <Route exact={true} path="/algorithm/:id" render={ routeProps => (
            <Algorithm routeProps={{...routeProps}}/>
          )}/>
        </Switch>
      </Router>
    );
  }
}

Main.propTypes = {
  algorithms: PropTypes.array,
  updateSelectedAlgorithm: PropTypes.func,
};

const mapStateToProps = state => ({
  algorithms: state.algorithm.scheduling,
});

const mapDispatchToProps = {
  updateSelectedAlgorithm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
