// Include React
import React, {Component} from "react";
import helpers from "./../utils/helpers";

class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form action="#" className="form-horizontal col-xs-8 col-xs-offset-2" onSubmit={this.props.handleSubmit}>
        {/*<!-- insert inputs -->*/}
        <div className="form-group">
          <label htmlFor="name" className="control-label col-xs-6">Name:</label>
          <div className="col-xs-6">
            <input id="name" type="text" className="form-control" value={this.props.name} onChange={this.props.handleChangeName} placeholder="Name"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="arrive" className="control-label col-xs-6">ArriveTime:</label>
          <div className="col-xs-6">
            <input id="arrive" type="text" className="form-control" value={this.props.arriveTime} onChange={this.props.handleChangeArriveTime} placeholder="0"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="burn" className="control-label col-xs-6">BurnTime:</label>
          <div className="col-xs-6">
            <input id="burn" type="text" className="form-control" value={this.props.burnTime} onChange={this.props.handleChangeBurnTime} placeholder="0"/>
          </div>
        </div>
        <div className="form-actions">
          <input id="add" type="submit" className="btn btn-primary" value="Add"/>
          <input id="clearAll" type="button" className="btn btn-primary" value="Clear All"/>
        </div>
      </form>
    );
  }
}

export default FormInput;