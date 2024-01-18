import React, { useState, useEffect } from 'react';
import { Accordion, Form, Col, Row, Container, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';



function AllCollapseExample() {
  const [medicos, setMedicos] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumeroColegiado, setIdNumeroColegiado] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consulta, setConsulta] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [MedicoId, setDatosMedico] = useState([]);
  const [medicoParaBorrar, setMedicoParaBorrar] = useState('');
  let id = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetch('http://localhost:5000/medicos')
      .then(response => response.json())
      .then(data => setMedicos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleMedicoChange = (e) => {
    const idMedico = e.target.value;
    setMedicoSeleccionado(idMedico);
    id = idMedico;

    if (idMedico) {
      fetch(`http://localhost:5000/medicos/${idMedico}`)
        .then(response => response.json())
        .then(data => {
          setDatosMedico({
            firstName: data.NombreMedico,
            lastName: data.ApellidoMedico,
            idNumeroColegiado: data.IdNumeroColegiado,
            email: data.CorreoMedico,
            consulta: data.Consulta,
            especialidad: data.Especialidad,
            disponibilidad: data.DisponibilidadMedico,
            isAdmin: data.Administrador
          });
          console.log(MedicoId);
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosParaEnviar = {
      NombreMedico: firstName,
      ApellidoMedico: lastName,
      IdNumeroColegiado: idNumeroColegiado,
      CorreoMedico: email,
      PasswordMedico: password,
      Consulta: consulta,
      Especialidad: especialidad,
      DisponibilidadMedico: disponibilidad,
      Administrador: isAdmin
    };

    console.log("Enviando datos del médico:", datosParaEnviar);

    fetch('http://localhost:5000/medicos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosParaEnviar),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      window.location.reload();
  };

  const handleSubmitmodificar
    = (e) => {
      e.preventDefault();
      const datosParaModificar = {
        NombreMedico: MedicoId.firstName,
        ApellidoMedico: MedicoId.lastName,
        IdNumeroColegiado: MedicoId.idNumeroColegiado,
        CorreoMedico: MedicoId.email,
        Consulta: MedicoId.consulta,
        Especialidad: MedicoId.especialidad,
        DisponibilidadMedico: MedicoId.disponibilidad,
        Administrador: MedicoId.isAdmin
      };

      console.log("Enviando datos del médico:", datosParaModificar);

      console.log(id);
      fetch(`http://localhost:5000/medicos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaModificar),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        window.location.reload();

    }
  const handleMedicoParaBorrarChange = (e) => {
    setMedicoParaBorrar(e.target.value);
  };
  const confirmarBorrado = () => {
    if (medicoParaBorrar) {
      fetch(`http://localhost:5000/medicos/${medicoParaBorrar}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          console.log(`Médico con ID ${medicoParaBorrar} eliminado con éxito.`);
          // Actualiza la lista de médicos aquí, si es necesario
          setMedicoParaBorrar(''); // Resetear el médico seleccionado después de borrar
          window.location.reload();
          setShowModal(false); // Cerrar el modal después de borrar
        } else {
          console.error('Error al intentar borrar el médico');
        }
      })
      .catch(error => {
        console.error('Error al conectar con el servidor:', error);
      });
    }
  };


  return (
    <>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Insertar Médico</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Label>First name</Form.Label>
                    <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </Col>
                  <Col>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} />
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Id Número de colegiado</Form.Label>
                  <Form.Control value={idNumeroColegiado} onChange={e => setIdNumeroColegiado(e.target.value)} type="text" placeholder="8 números" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">Password</Form.Label>
                  <Col sm="10">
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Consulta</Form.Label>
                  <Form.Control value={consulta} onChange={e => setConsulta(e.target.value)} type="text" placeholder="Número de consulta" />
                </Form.Group>
                <Form.Select value={especialidad} onChange={e => setEspecialidad(e.target.value)} aria-label="Especialidad">
                  <option value="">Especialidad</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="Medicina Interna">Medicina Interna</option>
                  <option value="Medicina Familiar">Medicina Familiar</option>
                  <option value="Psicologia">Psicologia</option>
                  <option value="Psiquiatria">Psiquiatria</option>
                  <option value="Ginecologia">Ginecologia</option>
                  <option value="Traumatologia">Traumatologia</option>
                  <option value="Alergologia">Alergologia</option>
                  <option value="Oftamolmologia">Oftamolmologia</option>
                </Form.Select>
                <Form.Select value={disponibilidad} onChange={e => setDisponibilidad(e.target.value)} aria-label="Disponibilidad">
                  <option value="">Elige disponibilidad:</option>
                  <option value="Maniana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Maniana y Tarde">Mañana y Tarde</option>
                </Form.Select>
                <div className="mb-3">
                  <Form.Check label="Admin" type="radio" name="admin" id="admin-yes" value="Si" checked={isAdmin === "Si"} onChange={() => setIsAdmin("Si")} />
                  <Form.Check label="No Admin" type="radio" name="admin" id="admin-no" value="No" checked={isAdmin === "No"} onChange={() => setIsAdmin("No")} />
                </div>
                <Button type="submit">Enviar</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Modificar Medico</Accordion.Header>
            <Accordion.Body>
              <Form.Select aria-label="Elegir Medico Medico" onChange={handleMedicoChange}>
                <option value="">Elegir Medico</option>
                {medicos.map(medico => (
                  <option key={medico.id} value={medico.id}>{medico.nombreCompleto}</option>
                ))}
              </Form.Select>

              {medicoSeleccionado && (
                <Form onSubmit={handleSubmitmodificar}>
                  <Row>
                    <Col>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        value={MedicoId.firstName}
                        onChange={(e) => setDatosMedico({ ...MedicoId, firstName: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        value={MedicoId.lastName}
                        onChange={(e) => setDatosMedico({ ...MedicoId, lastName: e.target.value })}
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Id Número de colegiado</Form.Label>
                    <Form.Control
                      value={MedicoId.idNumeroColegiado}
                      onChange={(e) => setDatosMedico({ ...MedicoId, idNumeroColegiado: e.target.value })}
                      type="text"
                      placeholder="8 números"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Dirección de Email</Form.Label>
                    <Form.Control

                      value={MedicoId.email}
                      onChange={(e) => setDatosMedico({ ...MedicoId, email: e.target.value })}
                      type="email"
                      placeholder="Ingrese email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Consulta</Form.Label>
                    <Form.Control
                      value={MedicoId.consulta}
                      onChange={(e) => setDatosMedico({ ...MedicoId, consulta: e.target.value })}
                      type="text"
                      placeholder="Número de consulta"
                    />
                  </Form.Group>

                  <Form.Select
                    value={MedicoId.especialidad}
                    onChange={(e) => setDatosMedico({ ...MedicoId, especialidad: e.target.value })}
                    aria-label="Especialidad"
                  >
                    <option value="">Seleccione Especialidad</option>
                    <option value="Pediatria">Pediatría</option>
                    <option value="Medicina Interna">Medicina Interna</option>
                    <option value="Medicina Familiar">Medicina Familiar</option>
                    <option value="Psicologia">Psicología</option>
                    <option value="Psiquiatria">Psiquiatría</option>
                    <option value="Ginecologia">Ginecología</option>
                    <option value="Traumatologia">Traumatología</option>
                    <option value="Alergologia">Alergología</option>
                    <option value="Oftamolmologia">Oftalmología</option>

                  </Form.Select>

                  <Form.Select
                    value={MedicoId.disponibilidad}
                    onChange={(e) => setDatosMedico({ ...MedicoId, disponibilidad: e.target.value })}
                    aria-label="Disponibilidad"
                  >
                    <option value="">Seleccione Disponibilidad</option>
                    <option value="Maniana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Maniana y Tarde">Mañana y Tarde</option>
                  </Form.Select>

                  <div className="mb-3">
                    <Form.Check
                      label="Admin"
                      type="radio"
                      name="adminm"
                      id="admin-yesm"
                      value="Si"
                      checked={MedicoId.isAdmin === "Si"}
                      onChange={() => setDatosMedico({ ...MedicoId, isAdmin: "Si" })}
                    />
                    <Form.Check
                      label="No Admin"
                      type="radio"
                      name="adminm"
                      id="admin-nom"
                      value="No"
                      checked={MedicoId.isAdmin === "No"}
                      onChange={() => setDatosMedico({ ...MedicoId, isAdmin: "No" })}
                    />
                  </div>

                  <Button type="submit">Guardar Cambios</Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
        <Accordion.Header>Borrar Médico</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Select
              aria-label="Elegir Médico"
              value={medicoParaBorrar}
              onChange={handleMedicoParaBorrarChange}
            >
              <option value="">Elegir Médico</option>
              {medicos.map(medico => (
                <option key={medico.id} value={medico.id}>
                  {medico.nombreCompleto}
                </option>
              ))}
            </Form.Select>
            <br />
            <Button className="btn-custom"
              onClick={() => setShowModal(true)}
              disabled={!medicoParaBorrar}
            >
              Borrar
            </Button>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              dialogClassName="modal-90w"
              aria-labelledby="modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                  ¿Estás seguro de que quieres eliminar a este médico?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Esta acción no se puede deshacer.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  No
                </Button>
                <Button variant="danger" onClick={confirmarBorrado}>
                  Sí, eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
        </Accordion >
      </Container >
    </>

  );
};

export default AllCollapseExample;

