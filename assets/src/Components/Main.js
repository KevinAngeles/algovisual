import React, {Component} from "react";
import {Col,Container,Row} from 'reactstrap';

// Import sub-components
import FormInput from "./FormInput/FormInput";
import JumboTron from "./JumboTron/JumboTron";
import NavBar from "./NavBar/NavBar";
import TableInputRows from "./TableInputRows/TableInputRows";
import TableOutputRows from "./TableOutputRows/TableOutputRows";
import BarChart from "./BarChart/BarChart";

// Helper Function
import helper from "./utils/helper";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeArriveTime = this.handleChangeArriveTime.bind(this);
    this.handleChangeBurnTime = this.handleChangeBurnTime.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    
    const graphMargin =  {
      top: 60,
      right: 30,
      bottom: 60,
      left: 30
    };
    const graphWidth = (600 - graphMargin.left - graphMargin.right);
    const graphHeight = (300 - graphMargin.top - graphMargin.bottom);
    const barPadding = 0.05;
    const barOuterPad = 0.2;
    
    this.state = {
      arriveTime: "",
      burnTime: "",
      name: "",
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
      let updatedTableOutput = helper.getSJFOrderedElements(deepCopyTableInput);

      this.setState({tableOutput: updatedTableOutput});
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
      let deepCopyUpdatedTableInput = JSON.parse(JSON.stringify([...prevState.tableInput,{arriveTime:arriveTime,burnTime:burnTime,name:name}]));

      return {tableInput: deepCopyUpdatedTableInput};
    });
  }

  handleChangeArriveTime(ev) {
    this.setState({
      arriveTime: ev.target.value,
    });
  }

  handleChangeBurnTime(ev) {
    this.setState({
      burnTime: ev.target.value,
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
              <li>Fill the form with the name of the process, arrive time, burn time and click on "Add."</li>
              <li>Repeat the same steps for each process.</li>
              <li>Every time the button "Add" is clicked, the result will be reordered in the table "Output." Additionally, the graphic below the tables will be also uploaded.</li>
              <li>In order to remove a single process, click on the button "Remove" in the desired row.</li>
              <li>In order to remove all the processes, click on the button "Clear All" above the table.</li>
            </ul>
            <FormInput
              arriveTime={this.state.arriveTime}
              burnTime={this.state.burnTime}
              name={this.state.name}
              handleChangeArriveTime={this.handleChangeArriveTime}
              handleChangeBurnTime={this.handleChangeBurnTime}
              handleChangeName={this.handleChangeName}
              handleAddButton={this.handleAddButton}
            />
          </div>
          <Row className="tables">
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
