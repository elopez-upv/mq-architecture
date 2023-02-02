import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import '../../assets/style/index.css'
import jobMutation from '../../hooks/git-executor/newJob'

function gitEvents() {
  const [urlInput, setUrl] = useState('')
  const [paramsInput, setParams] = useState('')
  const [fileNameInput, setFileName] = useState('')

  const handleChangeUrl = (e) => {
    setUrl(e.target.value)
  }

  const handleChangeParams = (e) => {
    setParams(e.target.value)
  }

  const handleChangeFileName = (e) => {
    setFileName(e.target.value)
  }

  const newJobMutation = jobMutation()
  const { createNewJob } = newJobMutation

  const newJobAction = () => {
    createNewJob({ urlInput, paramsInput, fileNameInput })
    setUrl('')
    setParams('')
    setFileName('')
  }

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
                      <Form.Control required type="text" placeholder="URL" onChange={handleChangeUrl} value={urlInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFileName">
                      <Form.Label>Nombre Ejecutable</Form.Label>
                      <Form.Control type="text" placeholder="file.sh" onChange={handleChangeFileName} value={fileNameInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formParams">
                      <Form.Label>Parámetros</Form.Label>
                      <Form.Control type="text" placeholder="Parámetros" onChange={handleChangeParams} value={paramsInput} />
                    </Form.Group>
                    <br />
                    <Row className="justify-content-md-center">
                      <Col md="auto">
                        <Button className="btn-grad" type="submit" onClick={(e) => { e.preventDefault(); newJobAction() }}>
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
