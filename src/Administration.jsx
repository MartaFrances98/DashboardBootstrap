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
      <Container className="my-3">
        <Button as={Link} to="/Dashboard" variant="primary" className="d-inline-flex align-items-center">
          <House className="me-2" /> Go Dashboard
        </Button>
      </Container>
      <Container>
        <section>
          <h2 className="text-center">Título del Primer Acordeón</h2>
          <div>
            <AllCollapseExample />
          </div>
        </section>

        <br></br>
        <br></br>


        <section>
          <h2 className="text-center">Título del Segundo Acordeón</h2>
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