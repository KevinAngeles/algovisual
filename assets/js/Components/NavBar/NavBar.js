// Include React
import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return(
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#"><h1>AlgoVisual</h1></NavbarBrand>
      </Navbar>
    );
  }
}

export default NavBar;
