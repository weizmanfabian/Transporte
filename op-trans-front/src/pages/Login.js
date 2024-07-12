import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
       
    };

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <form className='w-100' onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                <div className="text-center">
                    <img className="mb-4" src="/login.png" alt="" width="72" />
                </div>
                <h1 className="h3 mb-3 fw-normal text-center">Inicia sesión para continuar</h1>
                <div className="form-floating mb-3">
                    <input onChange={(e) => setUsername(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label htmlFor="floatingInput">Correo electrónico</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Recordarme
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
                <p className="mt-5 mb-3 text-muted text-center">&copy; 2024</p>
            </form>
        </div>
    );
};

export default Login;
