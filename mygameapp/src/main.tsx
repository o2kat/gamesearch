import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import GameDetail from './GameDetail.tsx';
import Favorites from './Favorites.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    </StrictMode>,
);