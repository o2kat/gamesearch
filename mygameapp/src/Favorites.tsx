import { useState } from 'react';
import { useFavorites } from './useFavorites';
import './Favorites.css';

const Favorites = () => {
    const { favorites, removeFromFavorites } = useFavorites();
    const [sortBy, setSortBy] = useState<'rating' | 'released'>('rating');

    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating; // Сортировка по рейтингу (от высокого к низкому)
        } else if (sortBy === 'released') {
            return new Date(b.released).getTime() - new Date(a.released).getTime(); // Сортировка по дате выхода (от новых к старым)
        }
        return 0;
    });

    return (
        <div className="favorites">
            <h2>Избранные игры</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'rating' | 'released')}>
                <option value="rating">Сортировать по рейтингу</option>
                <option value="released">Сортировать по дате выхода</option>
            </select>
            <div className="games-list">
                {sortedFavorites.map((game) => (
                    <div key={game.id} className="game-card">
                        <img src={game.background_image} alt={game.name} />
                        <h3>{game.name}</h3>
                        <p>Рейтинг: {game.rating}</p>
                        <p>Дата выхода: {game.released}</p>
                        <button onClick={() => removeFromFavorites(game.id)}>🗑️ Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;