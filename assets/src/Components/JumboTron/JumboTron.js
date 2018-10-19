// Include React
import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap';

class JumboTron extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Jumbotron>
        <h1>SJF Algorithm</h1>
        <h2>Non-preemptive algorithm</h2>
        <p>This is a web page created to <a href="#">explain and illustrate</a> some common algorithms.</p>
        <p>
          <a className="btn btn-lg btn-primary" href="#" role="button">Go to explanation »</a>
        </p>
      </Jumbotron>
    );
  }
}

export default JumboTron;
