import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import '../../assets/style/index.css'
import { GlobalContext } from '../../provider/global'

function gitJobs() {
  const { global } = useContext(GlobalContext)

  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontFamily: 'Open Sans, sans-serif' }}>
      <Row>
        <Col>
          <Card style={{ width: '100rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: '600' }}>Jobs Creados</Card.Title>
              <br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th key={1}>Id</th>
                    <th key={2}>Url</th>
                    <th key={3}>Archivo</th>
                    <th key={4}>Fecha Creación</th>
                    <th key={5}>Tiempo Demorado</th>
                    <th key={6}>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  { global.jobs.map((job) => (
                    <tr key={job.id}>
                      <td key={1}>{job.id}</td>
                      <td key={2}>{job.url}</td>
                      <td key={3}>{job.fileName}</td>
                      <td key={4}>{job.createdAt}</td>
                      <td key={5}>{job.elapsedTime}</td>
                      <td key={6}>{job.result}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default gitJobs
