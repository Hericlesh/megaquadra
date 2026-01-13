import React from 'react';
import './CartelaSection.css';
import logo from '../assets/logo.png';

// Helper function to generate random numbers (for simulation)
const generateRandomNumbers = (count = 4) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 99) + 1); // Numbers between 1 and 99
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

const CartelaSection = () => {
  const premios = [
    { id: 1, label: '1º', desc: '' },
    { id: 2, label: '2º', desc: '' },
    { id: 3, label: '3º', desc: '' },
    { id: 4, label: '4º', desc: '' },
    { id: 5, label: '5º', desc: '' },
    { id: 6, label: 'EXT', desc: '', isExtra: true }
  ];

  // Gerar 10 conjuntos de números para cada cartela
  const generateSets = () => {
    return Array.from({ length: 10 }).map(() => generateRandomNumbers());
  };

  const cupomNumber = 'EXEMPLO';

  return (
    <div id="cartela" className="cartela-section">
      <div className="cartela-wrapper">
        <div className="cartela-title">
          <img src={logo} alt="Mega Quadra da sorte" className="logo-image" />
        </div>
        <p className="cupom-text">Em um único cupom, 60 chances diferentes de ganhar. Viva sua sorte!</p>
        
        <div className="cartela-container">
          <div className="cupom-num">
            <span className="cupom-label">Cupom nº:</span>
            <span className="cupom-value">{cupomNumber}</span>
          </div>

          <div className="cartelas-inner">
            {premios.map((premio) => (
              <div className="cartela" key={premio.id}>
                <div className="sets">
                  {/* Célula de cabeçalho com o nome do prêmio */}
                  <div className="set header-set">
                    <div className="premio-header">
                      <span className="premio-header-text">
                        {premio.isExtra ? 'PRÊMIO EXTRA' : `${premio.label} PRÊMIO`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Conjuntos de números */}
                  {generateSets().map((set, index) => (
                    <div key={index} className="set">
                      <div className="conjunto-separator">
                        <span className="conjunto-text">{`${index + 1}º Conjunto`}</span>
                      </div>
                      <div className="numbers">
                        {set.map((num, idx) => (
                          <span key={idx} className="number-item">{num.toString().padStart(2, '0')}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="vertical-text">
                  Esses dez conjuntos para esse prêmio
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default CartelaSection; 