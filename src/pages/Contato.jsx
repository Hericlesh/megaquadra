import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import './Contato.css'; // Import CSS for styling

const Contato = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Updated handleSubmit to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable button during submission
    submitButton.textContent = 'Enviando...'; // Change button text

    try {
      const response = await fetch('http://localhost:3001/send-email', { // Target backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        // Success
        toast.success("Mensagem enviada com sucesso!");
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        // Handle backend errors (e.g., 500)
        const errorText = await response.text(); // Get error message from backend if any
        console.error("Error submitting form:", response.status, errorText);
        toast.error(`Falha ao enviar mensagem: ${errorText || 'Erro no servidor'}`);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      toast.error("Erro de rede ao tentar enviar a mensagem. Verifique sua conexão ou o status do servidor.");
    } finally {
      // Re-enable button and restore text regardless of outcome
      submitButton.disabled = false;
      submitButton.textContent = '💌 Enviar Mensagem';
    }
  };

  return (
    <div className="contato-container">
      {/* Add ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="contato-header">
        <h1>📧 Entre em Contato</h1>
        <p>
          Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para te atender com o maior prazer!
        </p>
      </div>
      
      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Assunto</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            placeholder="Qual o motivo do seu contato?"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Mensagem</label>
          <textarea 
            id="message" 
            name="message" 
            rows="6" 
            value={formData.message}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui..."
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-button">
          💌 Enviar Mensagem
        </button>
      </form>
    </div>
  );
};

export default Contato; 