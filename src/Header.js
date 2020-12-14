import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from 'styled-components'

import logo from './images/logo.jpg';

const Header = () => {
    return (
        <HeaderContainer className="main-header">
            <div className="header-middle">
                <div className="container">
                    <Navbar bg="--mainWhite" maxwidth="lg" expand="lg">
                        <Navbar.Brand href="#home">
                            <img
                                alt="logo"
                                src={logo}
                                width="80"
                                height="40"
                                className="d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#foo">About us</Nav.Link>
                                <NavDropdown title="What else to know?">
                                    <NavDropdown.Item href="#action/1">action 1</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/2">action 2</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3">action 3</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/4">action 4</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="search" className="mr-sm-2"/><Button
                                variant="outline-primary">search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.header`
  .header-middle {
    background: var(--mainWhite);
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;