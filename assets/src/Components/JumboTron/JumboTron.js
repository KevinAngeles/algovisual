// Include React
import React, {Component} from "react";
import helper from "./../utils/helper";

class JumboTron extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="jumbotron">
        <h1>SJF Algorithm</h1>
        <h2>Non-preemptive algorithm</h2>
        <p>This is a web page created to <a href="#">explain and illustrate</a> some common algorithms.</p>
        <p>
          <a className="btn btn-lg btn-primary" href="#" role="button">Go to explanation »</a>
        </p>
      </div>
    );
  }
}

export default JumboTron;
