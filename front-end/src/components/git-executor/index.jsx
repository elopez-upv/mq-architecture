import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../assets/style/index.css'

const MySwal = withReactContent(Swal)

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
function gitEvents() {
  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontFamily: 'Open Sans, sans-serif' }}>
      <Row>
        <Col>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: '600' }}>Nuevo Job</Card.Title>
              <br />
              <Row className="justify-content-md-center">
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGitUrl">
                      <Form.Label>Git Url</Form.Label>
                      <Form.Control required type="text" placeholder="URL" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formParams">
                      <Form.Label>Parámetros</Form.Label>
                      <Form.Control type="text" placeholder="Parámetros" />
                    </Form.Group>
                    <br />
                    <Row className="justify-content-md-center">
                      <Col md="auto">
                        <Button className="btn-grad" type="submit">
                          Aceptar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default gitEvents
