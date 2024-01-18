import React from 'react';
import { Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirige al usuario a la página de inicio de sesión si no está autenticado
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
