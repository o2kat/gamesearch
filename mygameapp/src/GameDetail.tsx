import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GameDetail.css';

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axios
            .get(`https://api.rawg.io/api/games/${id}?key=0a407f3ca1fe4cf3a7b7cd04d2577ea6`)
            .then((res) => {
                console.log('Детали игры:', res.data); // Проверьте данные в консоли
                setGame(res.data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (isLoading) return <p>Загрузка...</p>;

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