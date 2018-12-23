// Include React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navbar color="light" light expand="md">
        <NavbarBrand tag= { Link } to="/"><h1>AlgoVisual</h1></NavbarBrand>
      </Navbar>
    );
  }
}

export default NavBar;
