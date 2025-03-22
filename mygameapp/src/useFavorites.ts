import { useState, useEffect } from "react";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState < Game[] > ([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const addToFavorites = (game: Game) => {
        if (!favorites.some((fav) => fav.id === game.id)) {
            const updatedFavorites = [...favorites, game];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    const removeFromFavorites = (id: number) => {
        const updatedFavorites = favorites.filter((game) => game.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return { favorites, addToFavorites, removeFromFavorites };
};