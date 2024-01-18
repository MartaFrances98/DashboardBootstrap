import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { House } from 'react-bootstrap-icons';
import { BarChart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import {OverlayTrigger, Popover, Button } from 'react-bootstrap';




function NavbarComponent() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const [showErrorModal, setShowErrorModal] = useState(false);

//   const handleProtectedLinkClick = () => {
//     if (!isAuthenticated) {
//       setShowErrorModal(true);
//     }
//   };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  const popover = (
    <Popover id="popover-logout">
      <Popover.Header as="h3">¿Cerrar Sesión?</Popover.Header>
      <Popover.Body>
        Si cierras sesión, necesitarás iniciar sesión de nuevo para acceder.
      </Popover.Body>
    </Popover>
  );


  return (
    <>
    {showErrorModal && <ErrorModal message="Debes iniciar sesión para acceder a esta sección." onClose={handleCloseModal} />}
    <Navbar className="bgnavbar" expand={false}>
        <Container fluid>
            <Navbar.Brand href="#">CLINICA</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas className="bgnavbar" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                <Offcanvas.Header closeButton className="bgnavbar">
                    <Offcanvas.Title className="bgnavbar" id="offcanvasNavbarLabel">
                        Bienvenido
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bgnavbar">
                    <Nav className="justify-content-end flex-grow-1 pe-3 bgnavbar">
                        {isAuthenticated ? (
                            <>
                                <Link to="/Dashboard" className="nav-link">
                                    <House /> Dashboard
                                </Link>
                                <Link to="/grafos" className="nav-link">
                                    <BarChart /> Grafos
                                </Link>
                                <NavDropdown title="Dropdown">
                                    <NavDropdown.Item as={Link} to="/Administration">
                                        Administration
                                    </NavDropdown.Item>
                                    {/* Otros elementos del dropdown si los hay */}
                                </NavDropdown>
                            </>
                        ) : (
                            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                            <Button variant="danger">Entrar</Button>
                        </OverlayTrigger>                        )}
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
</>
);

}

export default NavbarComponent;