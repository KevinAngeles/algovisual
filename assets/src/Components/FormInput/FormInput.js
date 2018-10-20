// Include React
import React, {Component} from 'react';
import {Button,Col,Form,FormGroup,Label,Row} from 'reactstrap';
import PropTypes from 'prop-types';

class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Form action="#" className="col-xs-8 xs-offset-2">
        {/*<!-- insert inputs -->*/}
        <FormGroup row>
          <Col sm={{size:8,offset:2}}>
            <Row>
              <Label for="name" sm={6}>Name:</Label>
              <Col sm={6}>
                <input id="name" type="text" value={this.props.name} onChange={this.props.handleChangeName} placeholder="Name"/>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size:8,offset:2}}>
            <Row>
              <Label for="arrive" sm={6}>ArriveTime:</Label>
              <Col sm={6}>
                <input id="arrive" type="text" value={this.props.arriveTime} onChange={this.props.handleChangeArriveTime} placeholder="0"/>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size:8,offset:2}}>
            <Row>
              <Label for="burn" sm={6}>BurnTime:</Label>
              <Col sm={6}>
                <input id="burn" type="text" value={this.props.burnTime} onChange={this.props.handleChangeBurnTime} placeholder="0"/>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <Row form className="text-center mb-3">
          <Col sm={12}>
            <Button id="add" color="primary" className="mr-2" onClick={this.props.handleAddButton}>Add</Button>
            <Button id="clearAll" color="primary" onClick={this.props.handleClearButton}>Clear</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

FormInput.propTypes = {
  arriveTime: PropTypes.string,
  burnTime: PropTypes.string,
  name: PropTypes.string,
  handleAddButton: PropTypes.func,
  handleChangeArriveTime: PropTypes.func,
  handleChangeBurnTime: PropTypes.func,
  handleChangeName: PropTypes.func,
  handleClearButton: PropTypes.func
};

export default FormInput;
