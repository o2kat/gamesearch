import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFavorites } from './useFavorites';
import './App.css';

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
}

interface ApiResponse {
    results: Game[];
    count: number;
}

const App = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { favorites, addToFavorites } = useFavorites();

    const genres = [
        { id: 4, name: 'Action' },
        { id: 5, name: 'RPG' },
        { id: 6, name: 'Adventure' },
    ];

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        let url = `https://api.rawg.io/api/games?key=0a407f3ca1fe4cf3a7b7cd04d2577ea6&search=${searchTerm}&page=${currentPage}`;
        if (selectedGenre) {
            url += `&genres=${selectedGenre}`;
        }

        axios
            .get<ApiResponse>(url)
            .then((res) => {
                setGames(res.data.results);
                setTotalPages(Math.ceil(res.data.count / 20));
                setIsLoading(false); // Устанавливаем isLoading в false здесь
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
                setIsLoading(false); // Устанавливаем isLoading в false здесь
            });
    }, [searchTerm, selectedGenre, currentPage]);

    return (
        <div>
            <h1>Поиск игр с RAWG API</h1>
            <input
                type="text"
                placeholder="Поиск игры..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                <option value="">Все жанры</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <Link to="/favorites">Избранное ({favorites.length})</Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading && <p>Загрузка...</p>}
            <div className="games-list">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <Link to={`/game/${game.id}`}>
                            <img src={game.background_image} alt={game.name} />
                            <h3>{game.name}</h3>
                            <p>Рейтинг: {game.rating}</p>
                            <p>Дата выхода: {game.released}</p>
                        </Link>
                        <button onClick={() => addToFavorites(game)}>❤️ Добавить в избранное</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <span>Страница {currentPage} из {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
};

export default App;