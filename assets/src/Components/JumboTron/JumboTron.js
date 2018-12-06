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
        <h1>SJF Algorithm</h1>
        <h2>Non-preemptive algorithm</h2>
        <p>This is a web page created to explain and illustrate some common algorithms.</p>
        <p>
          <Button color='primary' size='lg' onClick={this.toggle}>Go to explanation »</Button>
        </p>
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
