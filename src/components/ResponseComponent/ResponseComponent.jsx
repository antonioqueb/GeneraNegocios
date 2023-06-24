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
      'prompt': `Generar idea de negocio basada en:
      Pasión/Actividad: ${this.props.answers.question1}
      Habilidades/Experiencias: ${this.props.answers.question2}
      Clientes/Competencia: ${this.props.answers.question3}`,
      'max_tokens': 200,
    };

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

    const data = await response.json();
    this.setState({ gptResponse: data.choices[0].text, modalIsOpen: true });
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
