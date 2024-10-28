import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecordingPage from './pages/RecordingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/record" element={<RecordingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;