import React from 'react';
import NavbarComponent from './Componentes/navbar.jsx';
import FooterComponent from './Componentes/footer.jsx';
import MyDoughnutChart from './Componentes/grafico2.jsx';
import MyLineChart from './Componentes/grafico1.jsx';
import MyLineChart2 from './Componentes/grafico5.jsx';
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
      <Container className="my-3">
        <Button as={Link} to="/Dashboard" variant="primary" className="d-inline-flex align-items-center">
          <House className="me-2" /> Go Dashboard
        </Button>
      </Container>
      <br></br>
      <br></br>
      <Container>
        <Row>
          <Col>
            <section>
              <h2 className="text-center">Título del Primer Acordeón</h2>
              <div>
                <MyDoughnutChart />
              </div>
            </section>
          </Col>
          <Col>
            <section>
              <h2 className="text-center">Título del Primer Acordeón</h2>
              <div>
                <MyLineChart />
              </div>
            </section>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <section>
              <h2 className="text-center">Título del Primer Acordeón</h2>
              <div>
                <MyBarChart />
              </div>
            </section>
          </Col>
          <Col>
            <section>
              <h2 className="text-center">Título del Primer Acordeón</h2>
              <div>
                <MyLineChart2 anio={2024} />
              </div>
            </section>
          </Col>
        </Row>


        <br></br>
        <br></br>
        <Row>
          <Col>
            <section>
              <h2 className="text-center">Título del Primer Acordeón</h2>
              <div>
                <MyRadarChart />
              </div>
            </section>
          </Col>
          <Col>
            <section>
              <div>
              </div>
            </section>
          </Col>
        </Row>



        {/* <br></br>
        <br></br>
        <section>
          <h2 className="text-center">Título del Primer Acordeón</h2>
          <div>
            <MyRadarChart />
          </div>
        </section> */}
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