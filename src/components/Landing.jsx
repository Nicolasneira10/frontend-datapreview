import React, { useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import bgLanding from '../assets/abstractdarkbackground.jpg';
import logoAnnalect from '../styles/annalect.png';
import { FaInfoCircle } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleOpenTermsModal = () => setShowTermsModal(true);
  const handleCloseTermsModal = () => setShowTermsModal(false);

  const handleLoginClick = () => {
    if (!termsAccepted) {
      setShowWarningModal(true); // Mostrar advertencia si no ha aceptado términos
    } else {
      navigate('/login');
    }
  };

  const handleAcceptTerms = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="landing-container" style={{ backgroundImage: `url(${bgLanding})` }}>
      <div className="landing-header">
        <img src={logoAnnalect} alt="Annalect logo" className="logo-img" />
        <button
          className="login-button"
          onClick={handleLoginClick}
          style={{ opacity: termsAccepted ? 1 : 0.6, cursor: termsAccepted ? 'pointer' : 'not-allowed' }}
        >
          Iniciar sesión
        </button>
      </div>

      <div className="landing-content">
        <h1>
          <strong>Marketing Science</strong><br />
          <span>annalect</span>
        </h1>
        <p>
          La herramienta está dirigida a Marketing Sciences que estén interesados en encontrar la relación
          experimental entre 2 variables, aprovechando un enfoque de rendimientos decrecientes con el fin de entender la saturación de estas relaciones.
          <span className="extra-note">
            Si desea conocer más, haga clic en <strong>“Ver más”</strong> para leer los Términos y Condiciones.
          </span>
        </p>
        <button className="see-more-button" onClick={handleOpenTermsModal}>
          <FaInfoCircle className="info-icon" />
          Ver más
        </button>
      </div>

      {/* MODAL: Términos y Condiciones */}
      {showTermsModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Términos y Condiciones de Uso</h2>
            <div className="modal-content">
              <p><strong>1. Uso de la herramienta</strong><br />
                Esta herramienta ha sido desarrollada exclusivamente como un complemento analítico para evaluar el impacto de variables distintas a las ventas netas. Su propósito es brindar soporte en el análisis de desempeño de distintas métricas, sin reemplazar en ningún momento las funcionalidades, resultados o metodologías proporcionadas por Omni. Esta herramienta NO debe ser utilizada como sustituto de Omni.
              </p>

              <p><strong>2. Alcance de la aplicación</strong><br />
                Esta aplicación no reemplaza ni interfiere con los modelos oficiales desarrollados o implementados en Omni. El uso de esta herramienta para interpretar el impacto sobre las variables intermedias diferente a las ventas implica que el usuario posee conocimiento técnico suficiente sobre la variable analizada, su comportamiento y sus implicaciones comerciales. Cualquier análisis que relacione ventas e inversión debe realizarse exclusivamente en Omni.
              </p>

              <p><strong>3. Calidad y revisión de los datos</strong><br />
                El usuario es responsable de garantizar la calidad, consistencia y pertinencia de los datos que se ingresan en la herramienta. También debe validar que los parámetros utilizados en el análisis estén correctamente definidos y revisar los supuestos, restricciones y características de las curvas utilizadas.
              </p>

              <p><strong>4. Limitaciones</strong><br />
                Esta herramienta no genera decisiones automáticas, sino que actúa como un insumo técnico adicional. Se recomienda su uso exclusivamente por perfiles con experiencia en modelos econométricos. Los resultados deben interpretarse con juicio analítico y no como único insumo para decisiones estratégicas.
              </p>

              <p><strong>5. Aceptación</strong><br />
                Al utilizar esta herramienta, el usuario declara que ha leído, comprendido y aceptado estos términos, y que utilizará la herramienta bajo su propio criterio técnico.
              </p>

              {/* Checkbox */}
              <div style={{ marginTop: '1em' }}>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={termsAccepted}
                  onChange={handleAcceptTerms}
                />
                <label htmlFor="acceptTerms" style={{ marginLeft: '0.5em' }}>
                  He leído y acepto los Términos y Condiciones
                </label>
              </div>
            </div>
            <button className="close-button" onClick={handleCloseTermsModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* MODAL: Advertencia si no acepta términos */}
      {showWarningModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>⚠ Atención</h3>
            <p>Debes leer y aceptar los Términos y Condiciones antes de iniciar sesión.</p>
            <button className="close-button" onClick={() => setShowWarningModal(false)}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
