// Include React
import React, {Component} from 'react';
import {Button,Jumbotron} from 'reactstrap';
import ModalDescription from '../../components/ModalDescription';
import { connect } from 'react-redux';
import { toggleModal, updateSelectedAlgorithm } from '../../actions';
import PropTypes from 'prop-types';

class JumboTron extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Jumbotron>
        <h2>{this.props.title}</h2>
        <p>This is a non preemptive scheduling algorithm. To visualize the output, follow the instructions below.</p>
        <Button color='primary' size='lg' onClick={this.props.toggleModal}>Go to explanation »</Button>
        <ModalDescription
          toggle={this.props.toggleModal}
          modal={this.props.modal}
          title={this.props.title}
          description={this.props.description}
        />
      </Jumbotron>
    );
  }
}

JumboTron.propTypes = {
  algorithmName: PropTypes.string,
  toggleModal: PropTypes.func,
  updateSelectedAlgorithm: PropTypes.func,
  modal: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

const mapStateToProps = state => ({
  title: state.algorithm.selected.name,
  description: state.algorithm.selected.description,
  modal: state.ui.modal
});

const mapDispatchToProps = {
  toggleModal,
  updateSelectedAlgorithm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JumboTron);
