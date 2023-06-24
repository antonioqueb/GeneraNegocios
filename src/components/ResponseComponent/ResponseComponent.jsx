import React, { Component } from 'react';
import './ResponseComponent.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Esta línea se necesita para la accesibilidad

class ResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gptResponse: '',
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.getGptResponse();
  }

  componentDidUpdate(prevProps) {
    if (this.props.answers !== prevProps.answers) {
      this.getGptResponse();
    }
  }

  async getGptResponse() {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Generar idea de negocio basada en:" },
        { role: "user", content: `Pasión/Actividad: ${this.props.answers.question1}` },
        { role: "user", content: `Habilidades/Experiencias: ${this.props.answers.question2}` },
        { role: "user", content: `Clientes/Competencia: ${this.props.answers.question3}` },
      ],
    };
  
    try {
      const response = await fetch('https://expressjs-server-production-af45.up.railway.app/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) throw new Error(response.statusText);
  
      const data = await response.json();
      this.setState({ gptResponse: data, modalIsOpen: true });
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.state.gptResponse);
  };

  render() {
    return (
      <div className="response-container">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Idea de Negocio Generada"
        >
          <h2>Idea de Negocio Generada</h2>
          <p>{this.state.gptResponse}</p>
          <button onClick={this.copyToClipboard}>Copiar al portapapeles</button>
          <button onClick={this.closeModal}>Cerrar</button>
        </Modal>
      </div>
    );
  }
}

export default ResponseComponent;
