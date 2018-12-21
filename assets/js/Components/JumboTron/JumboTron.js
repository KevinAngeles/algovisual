// Include React
import React, {Component} from 'react';
import {Button,Jumbotron} from 'reactstrap';
import ModalDescription from '../ModalDescription';

class JumboTron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(ev) {
    ev.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return(
      <Jumbotron>
        <p>This is a web page created to explain and illustrate some common algorithms.</p>
        <h2>SJF Algorithm</h2>
        <Button color='primary' size='lg' onClick={this.toggle}>Go to explanation »</Button>
        <ModalDescription
          toggle={this.toggle}
          modal={this.state.modal}
          title={this.props.algorithm.title}
          description={this.props.algorithm.description}
        />
      </Jumbotron>
    );
  }
}

export default JumboTron;
