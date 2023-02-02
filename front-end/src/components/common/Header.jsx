import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import logo from '../../assets/images/logo-white.png'

function Header() {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  const logout = () => {
    keycloak.logout()
    localStorage.clear()
  }

  const handleSelect = (eventKey) => navigate(eventKey)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" onSelect={handleSelect}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="170"
            className="d-inline-block align-top"
            alt="App logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="/">Git Executor</Nav.Link>
            <Nav.Link eventKey="reader">Jobs Result</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>{localStorage.getItem('userName')}</Nav.Link>
          </Nav>
          <Nav>
            <Button className="btn-grad" style={{ fontSize: '15px', boxShadow: 'none', padding: '10px 16px', border: 'none' }} onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
