import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaGift, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import mainImage from '../assets/MAIN.svg';
import P1 from '../assets/P1.svg';
import P2 from '../assets/P2.svg';
import P3 from '../assets/P3.svg';
import P4 from '../assets/P4.svg';
import P5 from '../assets/P5.svg';
import P6 from '../assets/P6.svg';
import ganhadorHomem from '../assets/ganhador-homem.jpeg';
import ganhadorMulher from '../assets/ganhador-mulher.jpeg';
import CartelaSection from './CartelaSection';
import './MainContent.css';

const WinnersSection = () => {
  const winners = [
    {
      name: "João Silva",
      prize: "Carro 0km",
      date: "15/03/2024",
      image: ganhadorHomem
    },
    {
      name: "Maria Santos",
      prize: "Moto",
      date: "10/03/2024",
      image: ganhadorMulher
    },
    {
      name: "Pedro Oliveira",
      prize: "Carro 0km",
      date: "05/03/2024",
      image: ganhadorHomem
    },
    {
      name: "Ana Costa",
      prize: "Moto",
      date: "01/03/2024",
      image: ganhadorMulher
    }
  ];

  return (
    <div id="ganhadores" className="winners-section">
      <h2 className="winners-title">
        <FaTrophy aria-hidden="true" />
        Últimos Ganhadores
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {winners.map((winner, index) => (
          <SwiperSlide key={index}>
            <div className="winner-card">
              <div className="winner-image">
                <img src={winner.image} alt={winner.name} />
              </div>
              <div className="winner-info">
                <h3>{winner.name}</h3>
                <p className="winner-prize">{winner.prize}</p>
                <p className="winner-date">{winner.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const PrizesSection = () => {
  const prizes = [
    { id: 1, name: "Casa + 2 Carros", image: P1, alt: "Prêmio 1" },
    { id: 2, name: "Casa + 2 Carros", image: P2, alt: "Prêmio 2" },
    { id: 3, name: "Casa + 2 Carros", image: P3, alt: "Prêmio 3" },
    { id: 4, name: "Casa + 2 Carros", image: P4, alt: "Prêmio 4" },
    { id: 5, name: "Casa + 2 Carros", image: P5, alt: "Prêmio 5" },
    { id: 6, name: "Prêmio Extra Surpresa", image: P6, alt: "Prêmio Extra" },
  ];

  return (
    <div id="premios" className="prizes-section">
      <h2 className="prizes-title">
        <FaGift aria-hidden="true" />
       Premiações
      </h2>
      <div className="prizes-grid">
        {prizes.map(prize => (
          <div className="prize-item" key={prize.id}>
            <img src={prize.image} alt={prize.alt} className="prize-image" />
            <h3 className="prize-name">{prize.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainContent = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 4.99;
  const navigate = useNavigate();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // Handler for direct input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // Update state only if it's a valid number >= 1
    // If input is empty or invalid, default back to 1
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  // Calculate and format the total price using useMemo for efficiency
  const totalPriceFormatted = useMemo(() => {
    const total = quantity * pricePerItem;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }, [quantity, pricePerItem]);

  const handlePurchase = () => {
    const data = {
      quantity,
      totalPrice: totalPriceFormatted,
      pricePerItem: pricePerItem.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    };
    navigate('/checkout', { state: data });
  };

  return (
    <>
      <div className="banner-image-container">
        <img src={mainImage} alt="Promoção Tenta Sorte" className="banner-image" />
      </div>

      <PrizesSection />
      <CartelaSection />
      
      <section className="banner-info-section">
        <div className="banner-text">
          <div className="banner-header">
            <div className="banner-badge">
              <span>🎉 GRANDE SORTEIO</span>
            </div>
            <h1>Mega Quadra da sorte</h1>
            <h2>Edição Especial - 06/07/2025</h2>
            <p className="date-highlight">📅 DOM, 06 JUL | 2025 - 14:00h</p>
          </div>

          <div className="banner-main-info">
            <div className="institution-info">
              <p className="institution-text">💚 Entidade Beneficiada</p>
              <p className="prize-highlight">Hospital do Câncer de Muriaé e Ubá/MG da Fundação Cristiano Varella</p>
            </div>
            
            <div className="highlights-grid">
              <div className="highlight-item">
                <span className="highlight-icon">🏠</span>
                <span className="highlight-text">Casas</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚗</span>
                <span className="highlight-text">Carros 0km</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🏍️</span>
                <span className="highlight-text">Motos</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💰</span>
                <span className="highlight-text">+ PIX</span>
              </div>
            </div>
          </div>

          <div className="banner-actions">
            {/* Quantity Controls with Price */}
            <div className="quantity-price-container">
               <div className="price-info">
                 <span className="price-label">Valor Total:</span>
                 <span className="total-price">{totalPriceFormatted}</span>
               </div>
               <div className="quantity-controls">
                 <button onClick={handleDecrement} className="quantity-btn" aria-label="Diminuir quantidade">-</button>
                 <input
                   type="number"
                   className="quantity-input"
                   value={quantity}
                   onChange={handleQuantityChange}
                   min="1"
                   aria-label="Quantidade"
                 />
                 <button onClick={handleIncrement} className="quantity-btn" aria-label="Aumentar quantidade">+</button>
               </div>
            </div>

            <button className="cta-button" onClick={handlePurchase}>
              <span>🛒 COMPRAR AGORA</span>
              <small>Participar do Sorteio</small>
            </button>
            
            <div className="security-info">
              <span>🔒 Pagamento 100% Seguro</span>
            </div>
          </div>
        </div>
      </section>

      <WinnersSection />
    </>
  );
};

export default MainContent; 