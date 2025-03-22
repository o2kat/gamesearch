import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GameDetail.css';

interface Game {
    id: number;
    name: string;
    background_image: string;
    description_raw: string;
    rating: number;
    released: string;
    platforms: { platform: { id: number; name: string } }[];
    genres: { id: number; name: string }[];
    short_screenshots: { id: number; image: string }[];
}

const GameDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axios
            .get<Game>(`https://api.rawg.io/api/games/${id}?key=0a407f3ca1fe4cf3a7b7cd04d2577ea6`)
            .then((res) => {
                setGame(res.data);
                setIsLoading(false); // Устанавливаем isLoading в false здесь
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
                setIsLoading(false); // Устанавливаем isLoading в false здесь
            });
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (isLoading) return <p>Загрузка...</p>;
    if (!game) return <p>Игра не найдена</p>;

    return (
        <div className="game-detail">
            <button onClick={() => navigate(-1)} className="back-button">Назад</button>
            <h2>{game.name}</h2>
            <img src={game.background_image} alt={game.name} />
            <p>{game.description_raw}</p>
            <p>Рейтинг: {game.rating}</p>
            <p>Дата выхода: {game.released}</p>
            <h3>Платформы:</h3>
            <ul>
                {game.platforms.map((platform) => (
                    <li key={platform.platform.id}>{platform.platform.name}</li>
                ))}
            </ul>
            <h3>Жанры:</h3>
            <ul>
                {game.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <h3>Скриншоты:</h3>
            <div className="screenshots">
                {game.short_screenshots.map((screenshot) => (
                    <img key={screenshot.id} src={screenshot.image} alt="Скриншот игры" />
                ))}
            </div>
        </div>
    );
};

export default GameDetail;