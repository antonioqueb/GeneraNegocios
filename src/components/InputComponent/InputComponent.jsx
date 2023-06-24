import { useState } from 'react';
import './InputComponent.css'; 
import ResponseComponent from '../ResponseComponent/ResponseComponent';

function App1() {
  const [step, setStep] = useState(1);
  const [showResponse, setShowResponse] = useState(false);
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
    setShowResponse(true);
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
            className="input" 
          />
          
          <button onClick={handleNext} className="button">Siguiente</button>
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
            className="input" 
          />
          
          <button onClick={handleGenerate} className="button">Generar</button>

        </div>
        {showResponse && <ResponseComponent answers={answers} />}

        </div>
        
      )}
    </div>
  );
}

export default App1;
