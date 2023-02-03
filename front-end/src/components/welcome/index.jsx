import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useKeycloak } from '@react-keycloak/web'
import logo from '../../assets/images/logo-black.png'
import '../../assets/style/index.css'

const Welcome = () => {
  const { keycloak } = useKeycloak()

  const login = () => {
    localStorage.clear()
    localStorage.setItem('myJobs', JSON.stringify({ jobs: [] }))
    keycloak.login()
  }

  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Open Sans, sans-serif' }}>
      <Row>
        <Col>
          <Card style={{ width: '30rem' }}>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: '600' }}>Git Executor</Card.Title>
              <br />
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button className="btn-grad" onClick={login}>Iniciar Sesión</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome
