import React, { Component } from 'react';
import './ResponseComponent.css';
import Modal from 'react-modal';
import { Configuration, OpenAIApi } from "openai";

require('dotenv').config();


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

  async getGptResponse() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello world" }],
      });
      this.setState({ gptResponse: chatCompletion.data.choices[0].message, modalIsOpen: true });
    } catch (error) {
      console.error("Error:", error);
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
