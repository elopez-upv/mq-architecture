/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import '../../assets/style/index.css'

function gitJobs() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const myJobs = JSON.parse(localStorage.getItem('myJobs'))
    const jobs = myJobs?.jobs ? myJobs.jobs : []
    setItems(jobs)
  }, [items])

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
                    <th>Id</th>
                    <th>Url</th>
                    <th>Tiempo Demorado</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  { items.map((job) => (
                    <tr>
                      <td>{job.id}</td>
                      <td>{job.url}</td>
                      <td>0</td>
                      <td>{job.result}</td>
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
