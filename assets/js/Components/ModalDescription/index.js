// Include React
import React, {Component} from 'react';
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import PropTypes from 'prop-types';

class ModalDescription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.description}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDescription.propTypes = {
  toggle: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  modal: PropTypes.bool,
};

export default ModalDescription;
