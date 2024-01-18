import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function GroupExample() {
    let navigate = useNavigate();

    return (
        <Container>
            <CardGroup>
                <Card>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '10rem' }}>
                        <Card.Title>Administración</Card.Title>
                        <Button variant="primary" onClick={() => navigate('/Administration')}>Ir a Administración</Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '10rem' }}>
                        <Card.Title>Gráficos</Card.Title>
                        <Button variant="primary" onClick={() => navigate('/grafos')}>Ir a Gráficos</Button>
                    </Card.Body>
                </Card>
                {/* <Card>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '10rem' }}>
                        <Card.Title>Login</Card.Title>
                        <Button variant="primary" onClick={() => navigate('/')}>Ir a Login</Button>
                    </Card.Body>
                </Card> */}
            </CardGroup>
        </Container>
    );
}

export default GroupExample;
