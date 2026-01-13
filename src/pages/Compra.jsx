import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Compra.css';

const Compra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Receber os dados passados da página principal
  const { quantity = 1, totalPrice = 'R$ 4,99' } = location.state || {};
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Função para formatar CPF
  const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar telefone
  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  // Validação simples de CPF
  const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };

  // Manipular mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpar erro quando o usuário digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setApiError('');

      try {
        // Preparar dados para a API
        const apiData = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          cpf: formData.cpf.replace(/\D/g, ''), // Remove formatação do CPF
          telefone: formData.telefone.replace(/\D/g, ''), // Remove formatação do telefone
          quantidade: quantity
        };

        // Fazer requisição para a API
        const response = await fetch('/gerar-cartelas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData)
        });

        console.log('Status da resposta:', response.status);
        console.log('Headers da resposta:', response.headers);
        console.log('Dados enviados:', apiData);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Resposta de erro da API:', errorText);
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // Tentar fazer parse da resposta JSON
        let result;
        try {
          const responseText = await response.text();
          console.log('Resposta bruta da API:', responseText);
          
          if (responseText.trim() === '') {
            // Resposta vazia - considerar sucesso se status for 200
            console.log('Resposta vazia - considerando sucesso');
            result = { success: true, message: 'Processamento realizado com sucesso' };
          } else {
            result = JSON.parse(responseText);
          }
        } catch (parseError) {
          console.error('Erro ao fazer parse da resposta JSON:', parseError);
          // Se não conseguir fazer parse mas o status for 200, considerar sucesso
          if (response.ok) {
            console.log('Parse falhou mas status OK - considerando sucesso');
            result = { success: true, message: 'Processamento realizado com sucesso' };
          } else {
            throw new Error('Resposta inválida da API');
          }
        }

        console.log('Resposta processada da API:', result);
        console.log('Tipo de result.success:', typeof result.success);
        console.log('Valor de result.success:', result.success);
        
        // Verificar se a resposta da API foi bem-sucedida
        // Considera sucesso se:
        // 1. success for true (boolean ou string) OU
        // 2. não houver campo success mas a resposta foi 200 OU
        // 3. houver campo message indicando sucesso
        const isSuccess = result.success === true || 
                         result.success === "true" ||
                         (response.ok && result.success !== false && result.success !== "false") ||
                         (result.message && result.message.toLowerCase().includes('sucesso'));
        
        console.log('Resultado da verificação de sucesso:', isSuccess);
        
        if (isSuccess) {
          // Sucesso - mostrar modal e redirecionar
          setShowSuccessModal(true);
          
          // Redirecionar após 3 segundos
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          // API retornou erro
          const errorMessage = result.message || result.error || 'Erro ao processar a compra';
          throw new Error(errorMessage);
        }
        
      } catch (error) {
        console.error('Erro ao enviar dados para API:', error);
        setApiError('Erro ao processar a compra. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="compra-container">
      <div className="compra-wrapper">
        <div className="compra-header">
          <button onClick={handleBack} className="back-button">
            ← Voltar
          </button>
          <h1>✨ Seu Sonho Está Aqui!</h1>
        </div>

        <div className="compra-content">
          <div className="purchase-summary">
            <h2>Resumo da Compra</h2>
            <div className="summary-item">
              <span>Mega Quadra da sorte</span>
              <span>Edição Especial - 06/07/2025</span>
            </div>
            <div className="summary-item">
              <span>Quantidade:</span>
              <span>{quantity} cupom(s)</span>
            </div>
            <div className="summary-item total">
              <span>Valor Total:</span>
              <span className="total-price">{totalPrice}</span>
            </div>
          </div>

          <div className="purchase-form">
            <h2>Dados do Comprador</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={errors.nome ? 'error' : ''}
                  placeholder="Digite seu nome completo"
                />
                {errors.nome && <span className="error-message">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Digite seu email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  maxLength="14"
                  className={errors.cpf ? 'error' : ''}
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <span className="error-message">{errors.cpf}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  maxLength="15"
                  className={errors.telefone ? 'error' : ''}
                  placeholder="(00) 00000-0000"
                />
                {errors.telefone && <span className="error-message">{errors.telefone}</span>}
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? '🔄 Processando...' : '🛒 Confirmar Compra'}
              </button>
              
              {apiError && (
                <div className="error-message api-error">
                  {apiError}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="security-notice">
          <span>🔒 Seus dados estão seguros e protegidos</span>
        </div>
      </div>

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <span>🎉</span>
            </div>
            <h2>Compra Realizada com Sucesso!</h2>
            <div className="success-details">
              <div className="detail-item">
                <span className="label">Nome:</span>
                <span className="value">{formData.nome}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Quantidade:</span>
                <span className="value">{quantity} cupom(s)</span>
              </div>
              <div className="detail-item">
                <span className="label">Valor Total:</span>
                <span className="value total">{totalPrice}</span>
              </div>
            </div>
            <p className="success-message">
              Um email de confirmação foi enviado para {formData.email}
            </p>
            <div className="success-actions">
              <button 
                onClick={() => navigate('/')} 
                className="success-button primary"
              >
                Voltar ao Início
              </button>
              <button 
                onClick={() => setShowSuccessModal(false)} 
                className="success-button secondary"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compra; 