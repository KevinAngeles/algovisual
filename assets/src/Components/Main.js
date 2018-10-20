import React, {Component} from 'react';
import {Container,Row} from 'reactstrap';

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
      let arriveTime = parseInt(prevState.arriveTime);
      let burnTime = parseInt(prevState.burnTime);
      let name = prevState.name;
      let uniqueId = prevState.lastUniqueId;
      let deepCopyUpdatedTableInput = JSON.parse(JSON.stringify([...prevState.tableInput,{arriveTime:arriveTime,burnTime:burnTime,name:name,uniqueId:uniqueId}]));

      return {tableInput: deepCopyUpdatedTableInput,lastUniqueId: (uniqueId+1)};
    });
  }

  handleClearButton(ev) {
    ev.preventDefault();
    this.setState({arriveTime: '',burnTime: '',name: ''});
  }

  handleChangeArriveTime(ev) {
    const filteredInput = helper.filterNonNumericCharacters(ev.target.value);

    this.setState({
      arriveTime: filteredInput,
    });
  }

  handleChangeBurnTime(ev) {
    const filteredInput = helper.filterNonNumericCharacters(ev.target.value);
    this.setState({
      burnTime: filteredInput,
    });
  }

  handleChangeName(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  render() {
    return (
      <Container>
        {/*<!-- Static navbar -->*/}
        <NavBar />

        {/*<!-- Main component for a primary marketing message or call to action -->*/}
        <JumboTron />

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
    );
  }
}

// Export the component back for use in other files
export default Main;
