// Include React
import React, {Component} from 'react';
import {Button,Jumbotron} from 'reactstrap';
import { Route } from 'react-router-dom';
import ModalDescription from '../../components/ModalDescription';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import PropTypes from 'prop-types';

class JumboTron extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Jumbotron>
        <Route path="/" render={() => (
          <p>This is a web page created to explain and illustrate some common algorithms.</p>
        )}/>
        <h2>SJF Algorithm</h2>
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
  toggleModal: PropTypes.func,
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
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JumboTron);
