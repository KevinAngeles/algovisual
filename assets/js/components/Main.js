import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

// Import sub-components
import FormInput from '../containers/FormInput';
import JumboTron from '../containers/JumboTron';
import NavBar from '../containers/NavBar';
import TableInputRows from '../containers/TableInputRows';
import TableOutputRows from '../containers/TableOutputRows';
import BarChart from '../containers/BarChart';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {/*<!-- Static navbar -->*/}
        <NavBar/>

        {/*<!-- Main component for a primary marketing message or call to action -->*/}
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
            <FormInput/>
          </div>
          <Row className="tables no-gutters">
            <TableInputRows/>
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

// Export the component back for use in other files
export default Main;
