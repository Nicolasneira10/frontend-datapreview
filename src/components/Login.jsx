import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import bgLanding from '../assets/abstractdarkbackground.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = 'admin@demo.com';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgLanding})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className="login-box">
        <div className="login-form">
          <h2>Login</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log("Usuario logueado:", decoded);

              // Puedes guardar en localStorage o redirigir:
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('userName', decoded.name);
              navigate('/dashboard');
            }}
            onError={() => {
              console.log('Error al iniciar sesión con Google');
            }}
          />

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#aaa' }}>
              ─ O continúa con tu correo ─
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p style={{ color: 'red', fontWeight: '500', marginTop: '10px' }}>
                {error}
              </p>
            )}

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Recuérdame
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


// id de cliente, google OAuth: 195211552518-kv3l2a10g34amb3ut7fk8khdjrsihia7.apps.googleusercontent.com
// secreto del cliente: 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