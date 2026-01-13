import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main App component
import './index.css'; // Keep global styles if any
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Regulamento from './pages/Regulamento.jsx'
import MainContent from './components/MainContent.jsx'
import Contato from './pages/Contato.jsx'
import Compra from './pages/Compra.jsx'
import Sorteio from './pages/Sorteio.jsx'

// Define a layout component using App directly
// App now contains the common layout (Header) and an Outlet
// const RootLayout = () => {
//   return <App />;
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route for the main layout (App component) */}
        <Route path="/" element={<App />}>
          {/* Index route: Render MainContent at the root path */}
          <Route index element={<MainContent />} />
          {/* Route for the regulations page, nested under App's layout */}
          <Route path="/regulamento" element={<Regulamento />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/checkout" element={<Compra />} />

          {/* Add other nested routes here */}
        </Route>
        {/* You could add routes outside the main layout here if needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
