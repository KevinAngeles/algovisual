// Include React
import React, { Component } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProcess, removeAllProcesses, updateInputProcessName, updateInputArriveTime, updateInputBurnTime } from '../../actions';

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
                <Input
                  id="name"
                  type="text"
                  value={this.props.name}
                  onChange={ ev => this.props.updateInputProcessName(ev.target.value) }
                  placeholder="Name"
                  invalid={this.props.errors.inputNameInvalid.status}
                />
                <FormFeedback>{this.props.errors.inputNameInvalid.msg}</FormFeedback>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size:8,offset:2}}>
            <Row>
              <Label for="arrive" sm={6}>ArriveTime:</Label>
              <Col sm={6}>
                <Input
                  id="arrive"
                  type="text"
                  value={this.props.arriveTime}
                  onChange={ ev => this.props.updateInputArriveTime(ev.target.value) }
                  placeholder="0"
                  invalid={this.props.errors.inputArriveTimeInvalid.status}
                />
                <FormFeedback>{this.props.errors.inputArriveTimeInvalid.msg}</FormFeedback>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size:8,offset:2}}>
            <Row>
              <Label for="burn" sm={6}>BurnTime:</Label>
              <Col sm={6}>
                <Input
                  id="burn"
                  type="text"
                  value={this.props.burnTime}
                  onChange={ ev => this.props.updateInputBurnTime(ev.target.value) }
                  placeholder="0"
                  invalid={this.props.errors.inputBurnTimeInvalid.status}
                />
                <FormFeedback>{this.props.errors.inputBurnTimeInvalid.msg}</FormFeedback>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <Row form className="text-center mb-3">
          <Col sm={12}>
            <Button id="add" color="primary" className="mr-2" onClick={ () => this.props.addProcess(this.props.routeProps.match.params.id) }>Add</Button>
            <Button id="clearAll" color="primary" onClick={this.props.removeAllProcesses}>Clear All</Button>
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
  errors: PropTypes.object,
  routeProps: PropTypes.object,
  addProcess: PropTypes.func,
  updateInputProcessName: PropTypes.func,
  updateInputArriveTime: PropTypes.func,
  updateInputBurnTime: PropTypes.func,
  removeAllProcesses: PropTypes.func
};

const mapStateToProps = state => ({
  arriveTime: state.ui.arriveTime,
  burnTime: state.ui.burnTime,
  name: state.ui.name,
  errors: state.ui.errors
});

const mapDispatchToProps = {
  addProcess,
  removeAllProcesses,
  updateInputProcessName,
  updateInputArriveTime,
  updateInputBurnTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInput);
