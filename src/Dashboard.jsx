import React, { useState, useEffect } from 'react';
import NavbarComponent from './Componentes/navbar.jsx';
import FooterComponent from './Componentes/footer.jsx';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import GroupExample from './Componentes/cards.jsx';
import LogoutButton from './Componentes/close.jsx';



const CitasComponent = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/citasTabla`)
      .then(response => response.json())
      .then(data => setCitas(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container>
      <Table striped bordered responsive="sm" hover>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Numero Consulta</th>
            <th>Nombre Paciente</th>
            <th>Apellido Paciente</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.Fecha}</td>
              <td>{cita.Hora}</td>
              <td>{cita.Consulta}</td>
              <td>{cita.nombrePaciente}</td>
              <td>{cita.apellidoPaciente}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

function Dashboard() {
  return (
    <>
      <header>
        <NavbarComponent />
      </header>
      <br></br>
      <br></br>
      <section className="bgbody">
      <h2 className="text-center">Título del Primer Acordeón</h2>
        <CitasComponent />
        <br></br>
        <br></br>
        <h2 className="text-center">Título del Primer Acordeón</h2>
        <GroupExample />
      </section>
      <br></br>
      <br></br>
      <Container className="my-3">
        <LogoutButton />
      </Container>
      <br></br>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
}

export default Dashboard;