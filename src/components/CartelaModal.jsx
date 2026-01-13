import React from 'react';
import './CartelaModal.css';

// Helper function to generate random numbers (for simulation)
const generateRandomNumbers = (count = 4) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 99) + 1); // Numbers between 1 and 99
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

const CartelaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const premios = [
    { id: 1, label: '1º PRÊMIO', desc: 'DESCRIÇÃO DO 1º PRÊMIO' },
    { id: 2, label: '2º PRÊMIO', desc: 'DESCRIÇÃO DO 2º PRÊMIO' },
    { id: 3, label: '3º PRÊMIO', desc: 'DESCRIÇÃO DO 3º PRÊMIO' },
    { id: 4, label: '4º PRÊMIO', desc: 'DESCRIÇÃO DO 4º PRÊMIO' },
    { id: 5, label: '5º PRÊMIO', desc: 'DESCRIÇÃO DO 5º PRÊMIO' }
  ];

  // Gerar 12 conjuntos de números para cada cartela
  const generateSets = () => {
    return Array.from({ length: 12 }).map(() => generateRandomNumbers());
  };

  const cupomNumber = '000.000.000';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Fechar modal">
          &times;
        </button>

        <div className="cartela-container">
          <div className="cupom-num">
            <span className="cupom-label">Cupom nº:</span>
            <span className="cupom-value">{cupomNumber}</span>
          </div>

          <div className="cartelas">
            {premios.map((premio) => (
              <div className="cartela" key={premio.id}>
                <div className="header">{premio.desc}</div>
                <div className="label">{premio.label}</div>
                <div className="sets">
                  {generateSets().map((set, index) => (
                    <div className="set" key={index}>
                      <div className="numbers">
                        {set.map((num, idx) => (
                          <span key={idx}>{num.toString().padStart(2, '0')}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="cupom-text">Em um único cupom, 60 chances diferentes de ganhar. Viva sua sorte!</p>
      </div>
    </div>
  );
};

export default CartelaModal; 