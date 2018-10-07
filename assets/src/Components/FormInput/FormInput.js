// Include React
import React, {Component} from "react";
import {Button,Col,Form,FormGroup,Label} from 'reactstrap';

class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Form action="#" className="col-xs-8 col-xs-offset-2">
        {/*<!-- insert inputs -->*/}
        <FormGroup>
          <Label for="name" xs={6}>Name:</Label>
          <Col xs="6">
            <input id="name" type="text" value={this.props.name} onChange={this.props.handleChangeName} placeholder="Name"/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="arrive" xs={6}>ArriveTime:</Label>
          <Col xs="6">
            <input id="arrive" type="text" value={this.props.arriveTime} onChange={this.props.handleChangeArriveTime} placeholder="0"/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="burn" xs={6}>BurnTime:</Label>
          <Col xs="6">
            <input id="burn" type="text" value={this.props.burnTime} onChange={this.props.handleChangeBurnTime} placeholder="0"/>
          </Col>
        </FormGroup>
        <FormGroup className="form-actions">
          <Button id="add" color="primary" onClick={this.props.handleAddButton}>Add</Button>
          <Button id="clearAll" color="primary">Primary</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default FormInput;