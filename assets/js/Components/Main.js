import React, {Component} from 'react';
import {Container,Row} from 'reactstrap';
import {HashRouter as Router} from 'react-router-dom';

// Import sub-components
import FormInput from './FormInput/FormInput';
import JumboTron from './JumboTron/JumboTron';
import NavBar from './NavBar/NavBar';
import TableInputRows from './TableInputRows/TableInputRows';
import TableOutputRows from './TableOutputRows/TableOutputRows';
import BarChart from './BarChart/BarChart';

// Helper Function
import algorithm from './utils/algorithm';
import helper from './utils/helper';
import graph from './utils/graph';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeArriveTime = this.handleChangeArriveTime.bind(this);
    this.handleChangeBurnTime = this.handleChangeBurnTime.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);

    const graphMargin =  {
      top: 60,
      right: 30,
      bottom: 60,
      left: 30
    };
    const graphWidth = (600 - graphMargin.right);
    const graphHeight = (300 - graphMargin.top);
    const barPadding = 0.05;
    const barOuterPad = 0.2;

    this.state = {
      arriveTime: '',
      burnTime: '',
      lastUniqueId: 0,
      name: '',
      tableInput: [],
      tableOutput: [],
      algorithm: {
        title: 'Shortest Job First (SJF)',
        description: 'SJF is a scheduling algorithm that selects the waiting process with the smallest execution time to execute next. It is non-preemptive because once a process start it cannot be halted until it finishes its execution.'
      },
      errors: {
        inputNameInvalid: false,
        inputArriveTimeInvalid: false,
        inputBurnTimeInvalid: false,
      },
      graph: {
        margin: graphMargin,
        width: graphWidth,
        height: graphHeight,
        barPadding: barPadding,
        barOuterPad: barOuterPad
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Update tableOutput if and only if tableInput was updated
    // Note: The only way to update tableInput is by removing or adding rows.
    //    Therefore, in this case, comparing lengths is a safe way to
    //    determine table updates.
    if(this.state.tableInput.length !== prevState.tableInput.length) {
      let deepCopyTableInput = JSON.parse(JSON.stringify(this.state.tableInput));
      let updatedTableOutput = algorithm.getSJFOrderedElements(deepCopyTableInput);

      const axisDomSelection = '#axis';
      const barsDomSelection = '#bars';
      const barHeight = 70;
      const graphWidth = this.state.graph.width;
      const graphHeight = this.state.graph.height;

      this.setState({tableOutput: updatedTableOutput}, () => {
        const isDataEmpty = (updatedTableOutput.length === 0);
        // If there is no data, clear Y axis, otherwise, draw Y axis.
        graph.drawYAxis(isDataEmpty,barHeight,axisDomSelection);
        // If there is no data, clear X axis, otherwise, draw X axis.
        graph.drawXAxis(updatedTableOutput,graphWidth,barHeight,axisDomSelection);
        // Draw bars
        graph.drawBars(updatedTableOutput,graphWidth,graphHeight,barHeight,barsDomSelection);
      });
    }
  }

  handleRemoveButton(ev) {
    ev.preventDefault();
    let idx = parseInt(ev.target.getAttribute('data-key'));
    this.setState( prevState => {
      let deepCopyUpdatedTableInput = JSON.parse(JSON.stringify(prevState.tableInput));
      deepCopyUpdatedTableInput.splice(idx,1);
      return {tableInput: deepCopyUpdatedTableInput};
    });
  }

  handleAddButton(ev) {
    ev.preventDefault();
    this.setState( prevState => {
      let arriveTime = prevState.arriveTime;
      let burnTime = prevState.burnTime;
      let name = prevState.name;
      let errorExists = false;
      let errors = JSON.parse(JSON.stringify(prevState.errors));

      if (name.trim().length === 0) {
        errorExists = true;
        errors.inputNameInvalid = true;
      }
      if (arriveTime.trim().length === 0) {
        errorExists = true;
        errors.inputArriveTimeInvalid = true;
      }
      if (burnTime.trim().length === 0) {
        errorExists = true;
        errors.inputBurnTimeInvalid = true;
      }

      let newState = {};

      if (errorExists) {
        newState.errors = errors;
      }
      else {
        let uniqueId = prevState.lastUniqueId + 1;
        newState.lastUniqueId = uniqueId;
        let deepCopyUpdatedTableInput = JSON.parse(JSON.stringify([...prevState.tableInput,{arriveTime:parseInt(arriveTime),burnTime:parseInt(burnTime),name:name,uniqueId:uniqueId}]));
        newState.tableInput = deepCopyUpdatedTableInput;
      }

      return newState;
    });
  }

  handleClearButton(ev) {
    ev.preventDefault();
    this.setState({tableInput: []});
  }

  handleChangeArriveTime(ev) {
    const filteredInput = helper.filterNonNumericCharacters(ev.target.value);

    this.setState( prevState => {
      let newState = {arriveTime: filteredInput};
      // If arriveTime was empty before, and now there is at least one character
      // clear any previous arriveTime error
      if (prevState.arriveTime.length === 0 && filteredInput.length > 0) {
        let inputArriveTimeError = { inputArriveTimeInvalid: false };
        let updatedErrors = Object.assign({},prevState.errors,inputArriveTimeError);
        newState['errors'] = updatedErrors;
      }
      return newState;
    });
  }

  handleChangeBurnTime(ev) {
    const filteredInput = helper.filterNonNumericCharacters(ev.target.value);

    this.setState( prevState => {
      let newState = { burnTime: filteredInput };
      // If burnTime was empty before, and now there is at least one character
      // clear any previous burnTime error
      if (prevState.burnTime.length === 0 && filteredInput.length > 0) {
        let inputBurnTimeError = {inputBurnTimeInvalid: false};
        let updatedErrors = Object.assign({},prevState.errors,inputBurnTimeError);
        newState['errors'] = updatedErrors;
      }
      return newState;
    });
  }

  handleChangeName(ev) {
    let nameVal = ev.target.value;
    this.setState( prevState => {
      // Update input name
      let newState = { name: nameVal };
      // If name was empty before, and now there is at least one non-blank character
      // clear any previous name error
      if (prevState.name.length === 0 && nameVal.length > 0) {
        let inputNameError = { inputNameInvalid: false };
        let updatedErrors = Object.assign({},prevState.errors,inputNameError);
        newState['errors'] = updatedErrors;
      }
      return newState;
    });
  }

  render() {
    return (
      <Router>
        <Container>
          {/*<!-- Static navbar -->*/}
          <NavBar />

          {/*<!-- Main component for a primary marketing message or call to action -->*/}
          <JumboTron 
            algorithm={this.state.algorithm}
          />

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
              <FormInput
                arriveTime={this.state.arriveTime}
                burnTime={this.state.burnTime}
                name={this.state.name}
                errors={this.state.errors}
                algoTitle={this.state.algorithm.title}
                algodDesc={this.state.algorithm.description}
                handleAddButton={this.handleAddButton}
                handleChangeArriveTime={this.handleChangeArriveTime}
                handleChangeBurnTime={this.handleChangeBurnTime}
                handleChangeName={this.handleChangeName}
                handleClearButton={this.handleClearButton}
              />
            </div>
            <Row className="tables no-gutters">
              <TableInputRows rows={this.state.tableInput} handleRemoveButton={this.handleRemoveButton}/>
              <TableOutputRows rows={this.state.tableOutput}/>
            </Row>
          </div>
          <div>
            <div id="graph">
              <BarChart
                tableInput={this.state.tableInput}
                margin={this.state.graph.margin}
                width={this.state.graph.width}
                height={this.state.graph.height}
                barPadding={this.state.graph.barPadding}
                barOuterPad={this.state.graph.barOuterPad}
              />
            </div>
          </div>
        </Container>
      </Router>
    );
  }
}

// Export the component back for use in other files
export default Main;
