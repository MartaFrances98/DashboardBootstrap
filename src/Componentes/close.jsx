import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Button onClick={handleLogout} className="btn-Dark" aria-label="Cerrar Sesión">
            <XCircle className="me-2 " />
            Log out
        </Button>
    );
};

export default LogoutButton;