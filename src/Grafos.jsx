import React from 'react';
import NavbarComponent from './Componentes/navbar.jsx';
import FooterComponent from './Componentes/footer.jsx';
import MyDoughnutChart from './Componentes/grafico2.jsx';
import MyLineChart from './Componentes/grafico1.jsx';
import MyBarChart from './Componentes/grafico3.jsx';
import MyRadarChart from './Componentes/grafico4.jsx';
import { Col, Row, Container } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Grafos() {
  return (
    <>
      <header>
        <NavbarComponent />
      </header>
      <br></br>
      <br></br>
      <h1 className="text-center">GRAPHICS</h1>
      <Container className="my-3">
        <Button as={Link} to="/Dashboard" variant="primary" className="d-inline-flex align-items-center btn-Info">
          <House className="me-2" /> Go Dashboard
        </Button>
      </Container>
      <br></br>
      <br></br>
      <Container>
        <Row>
          <Col className='mt-5 mt-xl-0'>
            <section>
              <div className="chart-container ">
                <h4 className="text-center">Number of appointments per month of the year</h4>
                <br></br>
                <div className='d-flex justify-content-center align-items-center'>
                  <MyBarChart />
                </div>
              </div>
            </section>
          </Col>
          <br></br>
          <Col className='mt-5 mt-xl-0'>
            <section>
              <div className="chart-container">
                <h4 className="text-center">Number of prescriptions by type of medicine</h4>
                <br></br>
                <div className='d-flex justify-content-center align-items-center'>
                  <MyLineChart />
                </div>
              </div>
            </section>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col className='mt-5 mt-xl-0'>
            <section>
              <div className="chart-container">
                <h4 className="text-center">Number of appointments by speciality</h4>
                <br></br>
                <div className='d-flex justify-content-center align-items-center'>
                  <MyDoughnutChart />

                </div>
              </div>
            </section>
          </Col>
          <br></br>
          <Col className='mt-5 mt-xl-0'>
            <section>
              <div className="chart-container">
                <h4 className="text-center">Number of appointments by speciality</h4>
                <br></br>
                <div className=' align-items-center'>
                  <MyRadarChart />
                </div>
              </div>
            </section>
          </Col>
        </Row>
        <br></br>
        <br></br>
      </Container>
      <div>
        <br></br>
        <br></br>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </>
  );
}
export default Grafos;