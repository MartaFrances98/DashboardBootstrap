import React, { useState, useEffect } from 'react';
import { Accordion, Form, Col, Row, Container, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function AllCollapsePacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [movil, setMovil] = useState('');
    const [idSeguroMedico, setIdSeguroMedico] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
    const [pacienteParaBorrar, setPacienteParaBorrar] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [segurosMedicos, setSegurosMedicos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/pacientes')
            .then(response => {
                console.log("Respuesta cruda:", response);
                return response.json();
            })
            .then(data => setPacientes(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handlePacienteChange = (e) => {

        const dniPaciente = e.target.value;
        setPacienteSeleccionado(dniPaciente);
        console.log(dniPaciente);

        if (dniPaciente) {
            fetch(`http://localhost:5000/pacientes/${dniPaciente}`)
                .then(response => response.json())
                .then(data => {
                    setNombre(data.NombrePaciente);
                    setApellido(data.ApellidoPaciente);
                    setDni(data.DNIPaciente);
                    setDireccion(data.DireccionPaciente);
                    setMovil(data.MovilPaciente);
                    setIdSeguroMedico(data.IdSeguroMedico);
                    setEmail(data.CorreoPaciente);
                })

                .catch(error => console.error('Error:', error));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const datosParaEnviar = {
            NombrePaciente: nombre,
            ApellidoPaciente: apellido,
            DNIPaciente: dni,
            DireccionPaciente: direccion,
            MovilPaciente: movil,
            IdSeguroMedico: idSeguroMedico,
            CorreoPaciente: email,
            PasswordPaciente: password
        };

        fetch('http://localhost:5000/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosParaEnviar),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    };

    const handleSubmitModificar = (e) => {
        e.preventDefault();
        const datosParaModificar = {
            NombrePaciente: nombre,
            ApellidoPaciente: apellido,
            DireccionPaciente: direccion,
            MovilPaciente: movil,
            IdSeguroMedico: idSeguroMedico,
            CorreoPaciente: email
        };
        console.log("Enviando datos del médico:", datosParaModificar);
        console.log(dni);

        fetch(`http://localhost:5000/pacientes/${dni}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosParaModificar),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    };

    const handlePacienteParaBorrarChange = (e) => {
        setPacienteParaBorrar(e.target.value);
    };

    const confirmarBorrado = () => {
        if (pacienteParaBorrar) {
            fetch(`http://localhost:5000/pacientes/${pacienteParaBorrar}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        console.log(`Paciente con DNI ${pacienteParaBorrar} eliminado con éxito.`);
                        setPacienteParaBorrar('');
                        window.location.reload();
                        setShowModal(false);
                    } else {
                        console.error('Error al intentar borrar el paciente');
                    }
                })
                .catch(error => {
                    console.error('Error al conectar con el servidor:', error);
                });
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/segurosmedicos')
            .then(response => response.json())
            .then(data => setSegurosMedicos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Insertar Paciente</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control value={nombre} onChange={e => setNombre(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control value={apellido} onChange={e => setApellido(e.target.value)} />
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control value={dni} onChange={e => setDni(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control value={direccion} onChange={e => setDireccion(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Móvil</Form.Label>
                                    <Form.Control value={movil} onChange={e => setMovil(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seguro Médico</Form.Label>
                                    <Form.Select value={idSeguroMedico} onChange={e => setIdSeguroMedico(e.target.value)}>
                                        <option value="">Selecciona un seguro médico</option>
                                        {segurosMedicos.map(seguro => (
                                            <option key={seguro.IdSeguroMedico} value={seguro.IdSeguroMedico}>
                                                {seguro.NombreSeguro}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" />
                                </Form.Group>
                                <Button type="submit">Enviar</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Modificar Paciente</Accordion.Header>
                        <Accordion.Body>
                            <Form.Select aria-label="Elegir Paciente" onChange={handlePacienteChange}>
                                <option value="">Elegir Paciente</option>
                                {pacientes.map(paciente => (
                                    <option key={paciente.dni} value={paciente.dni}>
                                        {paciente.nombreCompleto}
                                    </option>
                                ))}
                            </Form.Select>
                            {pacienteSeleccionado && (
                                <Form onSubmit={handleSubmitModificar}>
                                    <Row>
                                        <Col>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control
                                                value={apellido}
                                                onChange={e => setApellido(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control
                                            value={direccion}
                                            onChange={e => setDireccion(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Móvil</Form.Label>
                                        <Form.Control
                                            value={movil}
                                            onChange={e => setMovil(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Seguro Médico</Form.Label>
                                        <Form.Select value={idSeguroMedico} onChange={e => setIdSeguroMedico(e.target.value)}>
                                            <option value="">Selecciona un seguro médico</option>
                                            {segurosMedicos.map(seguro => (
                                                <option key={seguro.IdSeguroMedico} value={seguro.IdSeguroMedico}>
                                                    {seguro.NombreSeguro}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            type="email"
                                        />
                                    </Form.Group>
                                    <Button type="submit">Guardar Cambios</Button>
                                </Form>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Borrar Paciente</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Select
                                    aria-label="Elegir Paciente"
                                    value={pacienteParaBorrar}
                                    onChange={handlePacienteParaBorrarChange}
                                >
                                    <option value="">Elegir Paciente</option>
                                    {pacientes.map(paciente => (
                                        <option key={paciente.dni} value={paciente.dni}>{paciente.nombreCompleto}</option>
                                    ))}
                                </Form.Select>
                                <br />
                                <Button className="btn-custom" onClick={() => setShowModal(true)} disabled={!pacienteParaBorrar}>
                                    Borrar
                                </Button>
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="confirm-delete-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="confirm-delete-title">
                                            ¿Estás seguro de que quieres eliminar a este paciente?
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Esta acción no se puede deshacer. El paciente con DNI {pacienteParaBorrar} será eliminado permanentemente.
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
                </Accordion>
            </Container>
        </>
    );
}

export default AllCollapsePacientes;
