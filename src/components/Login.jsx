import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import bgLanding from '../assets/abstractdarkbackground.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = 'admindata@demo.com';
    const validPassword = 'test123!Data';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userEmail = decoded.email;

    if (userEmail.endsWith('@omnicommediagroup.com.co')) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', decoded.name);
      navigate('/dashboard');
    } else {
      setOpenSnackbar(true);
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

          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log('Error al iniciar sesión con Google')}
              useOneTap
            />
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#aaa' }}>
            ─ O continúa con las credenciales suministradas ─
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

      {/* Snackbar mejorado */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          icon={
            <WarningAmberRoundedIcon
              sx={{ color: '#fbbc04', fontSize: '24px', marginRight: '8px' }}
            />
          }
          closeIcon={<CloseIcon sx={{ color: '#ffffff' }} />} 
          sx={{
            backgroundColor: '#fbffe8', // fondo suave
            color: '#333',
            fontWeight: '600',
            fontSize: '15px',
            borderRadius: '10px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            alignItems: 'center',
          }}          
        >
          Solo se permite el acceso con correos de la compañia.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;





// id de cliente, google OAuth: 195211552518-kv3l2a10g34amb3ut7fk8khdjrsihia7.apps.googleusercontent.com
// secreto del cliente: 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