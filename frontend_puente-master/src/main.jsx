import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import App from './App.jsx'; // Home
import TestSelector from './pages/TestSelector.jsx'; // Página de selección de tests
import TestAutoconocimiento from './pages/TestAutoconocimiento.jsx'; // Test de autoconocimiento
import AdminResultados from './pages/AdminResultados.jsx';
import TestTiempoGestion from './pages/TestTiempoGestion.jsx';
import TestHabilidadesCognitivas from './pages/TestHabilidadesCognitivas.jsx';
import AdminResultadosHabCogni from './pages/AdminHabCogni.jsx';
import TestOrientacionVocacional from './pages/TestOrientacionVocacional.jsx';
import ResultadosOV from './pages/AdminOV.jsx';
import Proximamente from './pages/Proximamente.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tests" element={<TestSelector />} />
          <Route path="/testAutoconocimiento" element={<TestAutoconocimiento />} />
          <Route path="/testGestionTiempo" element={<Proximamente />} /> 
          <Route path="/testHabilidadesCognitivas" element={<Proximamente />} /> 
          <Route path="/testOrientacionVocacional" element={<Proximamente />} /> 
          <Route path="/admin/resultados" element={<AdminResultados />} />
          <Route path="/admin/resultadosHC" element={<AdminResultadosHabCogni/>} />
          <Route path="/admin/resultadosOV" element={<ResultadosOV/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
