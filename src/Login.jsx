import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import NavbarComponent from './Componentes/navbar.jsx';
import FooterComponent from './Componentes/footer.jsx';
import circular_logo from './img/circular_logo.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Guardar el token en localStorage
                navigate('/dashboard');
            } else {
                // Mostrar un mensaje de error más específico según el código de estado
                if (response.status === 401) {
                    alert('Credenciales incorrectas.');
                } else if (response.status === 403) {
                    alert('No tienes permisos de administrador.');
                } else {
                    alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
                }
            }
        } catch (error) {
            console.error('Hubo un error al intentar iniciar sesión', error);
        }
    };

    return (
        <>
            <header>
                <NavbarComponent />
            </header>

            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='4' md='6' style={{ textAlign: 'center' }}>
                        <img src={circular_logo} class="img-fluid" alt="logo" />
                    </MDBCol>

                    <MDBCol col='10' md='6'>
                        <div className="d-flex flex-row align-items-center justify-content-center login-espaciado-arriba ">
                            <p className="lead fw-normal mb-0 me-3" style={{ fontSize: '54px' }}>LOGIN</p>
                        </div>

                        <div className="form-espaciado">

                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='formControlLg'
                            type='email'
                            size="lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            id='formControlLg'
                            type='password'
                            size="lg"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        </div>
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn onClick={handleLogin} className="mb-0 px-5" size='lg'>Login</MDBBtn>
                        </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <footer>
                <FooterComponent />
            </footer>
        </>
    );
}

export default Login;