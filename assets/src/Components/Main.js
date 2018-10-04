import React, {Component} from "react";

// Import sub-components
import FormInput from "./FormInput/FormInput";
import JumboTron from "./JumboTron/JumboTron";
import NavBar from "./NavBar/NavBar";
import TableInputRows from "./TableInputRows/TableInputRows";
import TableOutputRows from "./TableOutputRows/TableOutputRows";

// Helper Function
import helpers from "./utils/helpers";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeArriveTime = this.handleChangeArriveTime.bind(this);
    this.handleChangeBurnTime = this.handleChangeBurnTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      arriveTime: "",
      burnTime: "",
      name: "",
      table: []
    };
  }

  handleClickButton(ev) {
    let idx = parseInt(ev.target.getAttribute('data-key'));
    this.setState( prevState => {
      let updatedTable = [...prevState.table];
      updatedTable.splice(idx,1);
      return {table: updatedTable};
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState( prevState => {
      let arriveTime = parseInt(prevState.arriveTime);
      let burnTime = parseInt(prevState.burnTime);
      let name = prevState.name;
      let updatedTable = [...prevState.table,{arriveTime:arriveTime,burnTime:burnTime,name:name}];
      return {table: updatedTable};
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
      <div>
        {/*<!-- Static navbar -->*/}
        <NavBar />

        {/*<!-- Main component for a primary marketing message or call to action -->*/}
        <JumboTron />

        <div className="container-form">
          <div id="formContainer" className="row-fluid">
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
              handleSubmit={this.handleSubmit}
            />
          </div>
          <div className="row-fluid tables">
            <TableInputRows rows={this.state.table} handleClickButton={this.handleClickButton}/>
            <TableOutputRows rows={this.state.table} handleClickButton={this.handleClickButton}/>
          </div>
        </div>
        <div>
          <div id="graph"></div>
        </div>
      </div>
    );
  }
}

// Export the component back for use in other files
export default Main;
