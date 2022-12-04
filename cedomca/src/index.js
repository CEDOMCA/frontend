import React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
render(
  <BrowserRouter>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CEDOMCA</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
)