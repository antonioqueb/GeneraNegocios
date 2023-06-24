import React, { Component } from 'react';
import './ResponseComponent.css'; // Reemplaza "tu-archivo-de-estilo.css" con el nombre de tu archivo CSS

class ResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gptResponse: '',
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

    const response = await fetch('/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OPENAI_API_KEY' // Recuerda reemplazar esto con tu clave API real
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    this.setState({ gptResponse: data.choices[0].text });
  }

  render() {
    return (
      <div className="response-container">
        <h2>Idea de Negocio Generada</h2>
        <p>{this.state.gptResponse}</p>
      </div>
    );
  }
}

export default ResponseComponent;
