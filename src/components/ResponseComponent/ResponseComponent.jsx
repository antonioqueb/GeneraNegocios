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
      isLoading: true, // Nuevo estado para controlar la carga
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
        { role: "system", content: "Vamos a generar una idea de negocio. Para hacerlo, necesitamos considerar varios factores:" },
        { role: "system", content: `Primero, piensa en tus pasiones o actividades preferidas: ${this.props.answers.question1}. ¿Cómo podrías convertir eso en una empresa o un producto?` },
        { role: "system", content: `Segundo, considera tus habilidades y experiencias: ${this.props.answers.question2}. ¿Cómo se aplican a tu idea de negocio?` },
        { role: "system", content: `Tercero, reflexiona sobre tus posibles clientes y la competencia: ${this.props.answers.question3}. ¿Cómo podrías diferenciarte y atraer a tu público objetivo?` },
        { role: "system", content: "Finalmente, con todos estos factores en mente, intenta crear un producto mínimo viable. ¿Cómo se vería? ¿Cómo podrías probarlo en el mercado de manera efectiva? Recuerda, mantén tu respuesta sintetizada y enfocada."},
      ],
    };

    try {
      // Simulación de la carga de la API
      await new Promise(resolve => setTimeout(resolve, 0.3));

      const response = await fetch('https://expressjs-server-production-af45.up.railway.app/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      if (data && data.content) {
        this.setState({ gptResponse: data.content, modalIsOpen: true, isLoading: false }); // Actualización del estado para mostrar la respuesta
      } else {
        console.error('Invalid response:', data);
      }

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
        {this.state.isLoading ? (
          <div className="preloader">
            {/* Aquí puedes agregar cualquier animación o diseño de preloader */}
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default ResponseComponent;
