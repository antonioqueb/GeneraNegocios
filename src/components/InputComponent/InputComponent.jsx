import { useState } from 'react';
import './InputComponent.css'; // Reemplaza "tu-archivo-de-estilo.css" con el nombre de tu archivo CSS
import ResponseComponent from '../ResponseComponent/ResponseComponent'; // Asegúrate de usar la ruta correcta



function App1() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleGenerate = () => {
    // Lógica para generar el resultado
    console.log('Respuestas:', answers);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h3>¿Qué es lo que más te apasiona o disfrutas hacer?</h3>
          <div className="input-container">
          <input
            type="text"
            name="question1"
            value={answers.question1}
            onChange={handleInputChange}
            className="input"
          />
          <button onClick={handleNext} className="button">Siguiente</button>
        </div>
      </div>
      )}
  
      {step === 2 && (
        <div>
          <h3>¿Qué habilidades o experiencias únicas tienes que podrías aplicar en tu negocio?</h3>
          <div className="input-container">
          <input
            type="text"
            name="question2"
            value={answers.question2}
            onChange={handleInputChange}
            className="input" // Agrega la clase "input" al input
          />
          
        <button onClick={handleNext} className="button">Siguiente</button> {/* Añade la clase "button" al botón */}
        </div>
        </div>
      )}
  
      {step === 3 && (
        <div>
          <h3>¿Quiénes serán tus clientes y por qué elegirían tu producto o servicio en lugar de los de la competencia?</h3>
          <div className="input-container">
          <input
            type="text"
            name="question3"
            value={answers.question3}
            onChange={handleInputChange}
            className="input" // Agrega la clase "input" al input
          />
          
          <button onClick={handleGenerate} className="button">Generar</button>

          {showResponse && <ResponseComponent answers={answers} />}

        </div>
        </div>
      )}
    </div>
  );
      }  

export default App1;
