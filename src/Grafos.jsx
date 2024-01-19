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
              <h4 className="text-center">Cantidad de citas por Especialidad</h4>
              <br></br>
              <div style={{  marginLeft: '150px'}}>
                <MyDoughnutChart />
              </div>
            </section>
          </Col>
          <Col>
            <section>
              <h4 className="text-center">Cantidad de recetas por tipo de Medicamento</h4>
              <br></br>
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
              <h4 className="text-center">Cantidad de citas por mes del año</h4>
              <br></br>
              <div>
                <MyBarChart />
              </div>
            </section>
          </Col>
          <Col>
            <section>
              <h4 className="text-center">Numero de citas por Especialidad</h4>
              <br></br>
              <div>
                <MyRadarChart />
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