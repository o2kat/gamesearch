import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import GameDetail from './GameDetail';
import Favorites from './Favorites';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default Main;