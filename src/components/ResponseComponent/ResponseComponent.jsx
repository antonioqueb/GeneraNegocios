import React, { Component } from 'react';
import './ResponseComponent.css';
import Modal from 'react-modal';
import { Configuration, OpenAIApi } from 'openai';

Modal.setAppElement('#root'); // Esta línea se necesita para la accesibilidad

const configuration = new Configuration({
    organization: 'org-Ypd7CxP5BN0mCzEXcWCvREwr',
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

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
      const response = await openai.createChatCompletion(requestBody);
      const data = response.data.choices[0].message.content;
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
