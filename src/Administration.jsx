import React from 'react';
import NavbarComponent from './Componentes/navbar.jsx';
import FooterComponent from './Componentes/footer.jsx';
import AllCollapseExample from './Componentes/accordion.jsx'
import AllCollapsePaciente from './Componentes/accordionPacient.jsx'
import { Container } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Administration() {
  return (
    <>
      <header>
        <NavbarComponent />
      </header>
      <br></br>
      <br></br>
      <h1 className="text-center">ADMINISTRATION</h1>
      <Container className="my-3">
        <Button as={Link} to="/Dashboard" variant="primary" className="d-inline-flex align-items-center">
          <House className="me-2" /> Go Dashboard
        </Button>
      </Container>
      <Container>
        <section>
          <h4 className="text-center">Administrar personal medico</h4>
          <br></br>
          <div>
            <AllCollapseExample />
          </div>
        </section>
        <br></br>
        <br></br>
        <section>
          <h4 className="text-center">Administrar pacientes</h4>
          <br></br>
          <div>
            <AllCollapsePaciente />
          </div>
        </section>
      </Container>
      <br></br>
      <br></br>
      <div>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </>
  );
}
export default Administration;