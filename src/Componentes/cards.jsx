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
                <Card className="custom-card">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '10rem' }}>
                        <Card.Title>Administration</Card.Title>
                        <Button variant="primary" onClick={() => navigate('/Administration')}>Go Administration</Button>
                    </Card.Body>
                </Card>
                <Card className="custom-card">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '10rem' }}>
                        <Card.Title>Graphics</Card.Title>
                        <Button variant="primary" onClick={() => navigate('/grafos')}>Go Graphics</Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Container>
    );
}

export default GroupExample;
